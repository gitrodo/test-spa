export const TWEETS: any = [
    {
        data:
        {
            author_id: 1,
            id: 654123,
            public_metrics:
            {
                retweet_count: 84,
                reply_count: 0,
                like_count: 0,
                quote_count: 0
            },
            text: "My first tweet"
        },
        includes: {
            users: [{
                id: "1264957606382063616",
                name: "Hugh Jackman",
                username: "HughJackman"
            }]
        },
        matching_rules: {
            id: 1354881060807581880,
            tag: null
        }
    },
    {
        data:
        {
            author_id: 2,
            id: 845465,
            public_metrics:
            {
                retweet_count: 84,
                reply_count: 0,
                like_count: 0,
                quote_count: 0
            },
            text: "This is a second tweet"
        },
        includes: {
            users: [{
                id: "1264957606382063616",
                name: "Dwayne Johnson",
                username: "TheRock"
            }]
        },
        matching_rules: {
            id: 1354881060807581740,
            tag: null
        }
    },
    {
        data:
        {
            author_id: 3,
            id: 987465,
            public_metrics:
            {
                retweet_count: 84,
                reply_count: 0,
                like_count: 0,
                quote_count: 0
            },
            text: "This is a third tweet"
        },
        includes: {
            users: [{
                id: "1264957606382063616",
                name: "Thor Odinson",
                username: "GodOfThunder"
            }]
        },
        matching_rules: {
            id: 1354881060807581700,
            tag: null
        }
    }
]