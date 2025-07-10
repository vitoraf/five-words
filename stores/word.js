import { defineStore, acceptHMRUpdate } from "pinia";
import supabase from "~/utils/supabase";
// You can name the return value of `defineStore()` anything you want,
// but it's best to use the name of the store and surround it with `use`
// and `Store` (e.g. `useUserStore`, `useCartStore`, `useProductStore`)
// the first argument is a unique id of the store across your application
export const useWordsStore = defineStore(
  "words",
  () => {
    const wordsList = ref(Array(5).fill(""));
    const user = ref({
      id: crypto.randomUUID(),
      name: "",
      words: Array(5).fill(""),
      position: [true, true, false, false, false],
      round: 1,
      index: 0,
      guesses: {
        1: "",
        2: "",
        3: "",
        4: "",
      },
    });
    const opponent = ref({
      position: [true, true, false, false, false],
      round: 1,
      index: 0,
      guesses: {
        1: "",
        2: "",
        3: "",
        4: "",
      },
    });
    const initialTurn = Math.floor(Math.random() * 2);
    const state = ref({
      turn: "",
      winner: null,
    });
    const channel = ref(null);

    async function createOrJoinChannel() {
      user.value.words = wordsList.value;
      user.value.guesses = {
        1: "",
        2: "",
        3: "",
        4: "",
      };
      user.value.winner = null;
      user.value.round = 1;
      user.value.index = 0;
      channel.value = supabase.channel("5words", {
        config: {
          broadcast: {
            self: true,
          },
          state: true,
        },
      });

      channel.value
        .on("presence", { event: "sync" }, () => {
          const others = channel.value.presenceState();
          let aux = [];
          // console.log(Object.values(others).length)
          Object.values(others).forEach((player, index) => {
            aux.push(player[0]);
            let op = aux.find((player) => player.id !== user.value.id);
            // console.log(op)
            opponent.value = op;
            // console.log(opponent.value)
          });
        })
        .on("broadcast", { event: "guess" }, ({ payload }) => {
          console.log("guess", payload);
          if (payload.userId !== user.value.id) {
            opponent.value.guesses[payload.round] = payload.word;
            // state.value.guess = payload
          }
        })
        .on("broadcast", { event: "turn" }, ({ payload }) => {
          // console.log('turn', payload)
          state.value.turn = payload.turn;
        })
        .on("broadcast", { event: "winner" }, ({ payload }) => {
          state.value.winner = payload.winner;
        })
        .on("state", { event: "sync" }, ({ payload }) => {
          state.value = payload;
        });

      await channel.value.subscribe();

      // await channel.value.setState({
      //   players:{
      //     [user.value.id]: {
      //       name: user.value.name,
      //       words: wordsList.value,
      //       guesses: [],
      //     }
      //   }
      // })

      await channel.value.track(user.value);
      setTurn(user.value.id);
    }

    async function guessWord(word) {
      let guess = normalizeWords(word.toLowerCase());
      let target = normalizeWords(
        opponent.value.words[user.value.round].toLowerCase()
      );
      await channel.value.send({
        type: "broadcast",
        event: "guess",
        payload: {
          userId: user.value.id,
          guess: guess,
          round: user.value.round,
          index: user.value.index,
        },
      });
      if (guess === target) {
        user.value.guesses[user.value.round] = word;
        user.value.position[user.value.round] = true;
        if (user.value.round === user.value.position.length - 1) {
          declareWinner(user.value.id);
        } else {
          user.value.round += 1;
        }
        user.value.index = 0;
      } else {
        setTurn(opponent.value.id);
        user.value.index += 1;
      }
    }

    async function setTurn(nextUserId) {
      // console.log(nextUserId)
      state.value.turn = nextUserId;
      await channel.value.send({
        type: "broadcast",
        event: "turn",
        payload: {
          turn: nextUserId,
        },
      });
    }

    function normalizeWords(text) {
      text = text.replace(/[ÀÁÂÃÄÅàáâãäå]/g, "A");
      text = text.replace(/[ÈÉÊËéèêë]/g, "E");
      text = text.replace(/[ÌÍÎÏíìîï]/g, "I");
      text = text.replace(/[ÒÓÔÕÖóòôõö]/g, "O");
      text = text.replace(/[ÙÚÛÜúùûü]/g, "U");
      return text;
    }

    async function declareWinner(winnerId) {
      state.value.winner = winnerId;
      state.value.status = "finished";
      await channel.value.send({
        type: "broadcast",
        event: "winner",
        payload: {
          winner: winnerId,
        },
      });
    }

    async function resetGame() {
      state.value = {
        turn: "",
        winner: null,
      };
      wordsList.value = Array(5).fill("");
      opponent.value.position= [true, true, false, false, false]
      opponent.value.round= 1
      opponent.value.index= 0
      opponent.value.guesses= {
        1: "",
        2: "",
        3: "",
        4: "",
      }
      user.value.round= 1
      user.value.index= 0
      user.value.guesses= {
        1: "",
        2: "",
        3: "",
        4: "",
      }
      user.value.position = [true, true, false, false, false]
      navigateTo("/");
    }

    return {
      user,
      opponent,
      createOrJoinChannel,
      guessWord,
      setTurn,
      declareWinner,
      resetGame,
      wordsList,
      state,
      initialTurn,
    };
  },
  {
    persist: true,
  }
);

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useWordsStore, import.meta.hot));
}
