import * as process from "node:process";

const parseArguments = (args: string[]) => {
    if (args.length > 4) {
        throw new Error('Too many arguments');
    }

    if (args.length < 4) {
        throw new Error('Too few arguments');
    }

    if (isNaN(Number(args[2])) || isNaN(Number(args[3]))) {
        throw new Error('Invalid arguments');
    }

    return {
        height: Number(args[2]),
        weight: Number(args[3])
    };

}

const calculateBmi = (height: number, weight: number) => {
    const bmi = weight / (height / 100 * height / 100);
    if (bmi < 18.5) {
        return 'Underweight';
    } else if (bmi < 25.0) {
        return 'Normal range';
    } else return 'Overweight';
}

const {height, weight} = parseArguments(process.argv)
console.log(calculateBmi(height, weight))