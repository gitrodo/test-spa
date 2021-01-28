import { includes } from "./model.includes";
import { matching_rules } from "./model.matching_rules";
import { public_metrics } from "./model.public_metrics";

export interface Tweet {
    0: number;
    1: {
        data: {
            author_id: number;
            id: number;
            public_metrics: public_metrics;
            text: string;
        },
        includes: includes,
        matching_rules: matching_rules
    };
}