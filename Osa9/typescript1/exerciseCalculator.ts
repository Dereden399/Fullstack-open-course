interface ExerciseArguments {
    days: Array<number>;
    target: number;
}

interface ExerciseTable {
    totalDays: number;
    trainingDays: number;
    target: number;
    averageTime: number;
    rating: number;
    description: string;
    success: boolean;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseExerciseArguments = (args: Array<any>): ExerciseArguments => {
    if(args.length < 4) throw new Error("you must enter target and at least one day");
    const parsedArr = args.slice(3).map(hours => {
        if(isNaN(Number(hours))) throw new Error("all day's hours must be a number");
        return Number(hours);
    });
    return {
        days: parsedArr,
        target: Number(args[2])
    };
};

const makeExerciseTable = (args: ExerciseArguments): ExerciseTable => {
    const target = args.target;
    const avg = args.days.reduce((sum, a) => sum + a, 0) / args.days.length;
    const totalDays = args.days.length;
    const trainingDays = args.days.filter(a => a > 0).length;
    const rating = avg >= target ? 3 : avg > target - 0.5 ? 2 : 1;
    const description = rating === 3 ? "Goal achieved! Very good!" : rating === 2 ? "Good, but could be better." : "Bad. You should exercise more";
    const success = rating === 3;
    return {
        totalDays,
        trainingDays,
        target,
        averageTime: avg,
        rating,
        description,
        success
    };
};

try {
    const args = parseExerciseArguments(process.argv);
    const table = makeExerciseTable(args);
    console.log(table);
} catch (error: unknown) {
    if (error instanceof Error) {
        console.log('Error:', error.message);
    }
}

export default {
    parseExerciseArguments,
    makeExerciseTable
};