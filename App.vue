<template>
    <div v-if="isLoading" class="min-h-screen flex items-center justify-center font-bold">
        <div class="block text-center">
            <img src="https://media.tenor.com/HHUcXimKS7cAAAAi/yay-jumping.gif" alt="Loading" width="100" height="100" />
            <p>Loading...</p>
        </div>
    </div>

    <div v-else-if="guess !== 'playing'">
        <Result :result="result.message === guess" :expression="result.expression" :nums="data.nums" />
    </div>

    <div v-else class="min-h-screen flex items-center justify-center font-bold p-5">
        <div class="block text-center">
            <p class="mb-3 text-2xl">
                Can the following list of numbers be operated in such a way that it produces 24? 👀
            </p>
            <p class="mb-5 text-2xl">
                [{{ data.nums[0] }},{{ data.nums[1] }},{{ data.nums[2] }},{{ data.nums[3] }}]
            </p>
            <div class="flex items-center justify-center mb-8">
                <button @click="setGuess(true)" class="font-bold" style="
            border-radius: 50px;
            padding-top: 10px;
            padding-bottom: 10px;
            padding-left: 30px;
            padding-right: 30px;
            margin-right: 15px;
            display: block;
          ">
                    True ✅
                </button>
                <button @click="setGuess(false)" class="font-bold" style="
            border-radius: 50px;
            padding-top: 10px;
            padding-bottom: 10px;
            padding-left: 30px;
            padding-right: 30px;
            display: block;
          ">
                    False ❌
                </button>
            </div>
            <router-link to="/">
                <button class="font-bold" style="
            border-radius: 50px;
            padding-top: 10px;
            padding-bottom: 10px;
            display: block;
          ">
                    Back
                </button>
            </router-link>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            data: { nums: [1, 2, 3, 4] },
            isLoading: true,
            guess: "playing",
            result: { message: false, expression: "" },
        };
    },
    methods: {
        async fetchData() {
            try {
                // Fetch random data
                const randomDataRes = await fetch("/api/random", {
                    method: "POST",
                });
                const randomData = await randomDataRes.json();
                this.data = randomData;

                // Fetch result based on the fetched random data
                const isPossibleRes = await fetch("/api/is_possible", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        nums: randomData.nums,
                        target: 24,
                    }),
                });
                const isPossibleResult = await isPossibleRes.json();
                this.result = isPossibleResult;
                this.isLoading = false;
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        },
        setGuess(value) {
            this.guess = value;
        },
    },
    mounted() {
        this.fetchData();
    },
};
</script>

<style scoped>
/* Add your styles here */
</style>
