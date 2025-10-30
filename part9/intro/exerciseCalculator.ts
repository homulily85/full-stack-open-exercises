interface Result {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

const parseArguments = (args: string[]) => {
    if (args.length < 4) {
        throw new Error('Too few arguments');
    }

    const target = Number(args[2])
    if (isNaN(target)) {
        throw new Error('Invalid arguments');
    }

    const hours: number[] = []

    for (let i = 3; i < args.length; i++) {
        let t = Number(args[i])
        if (isNaN(t)) {
            throw new Error('Invalid arguments');
        }
        hours.push(t)
    }

    return {
        target,
        hours
    };

}

const calculateExercises = (hours: number[], target: number): Result => {
    return {
        periodLength: hours.length,
        trainingDays: hours.filter(h => h !== 0).length,
        success: hours.reduce((a, b) => a + b) / hours.length > target,
        rating: 2,
        ratingDescription: 'I like that',
        target: target,
        average: hours.reduce((a, b) => a + b) / hours.length
    }
}

const {hours, target} = parseArguments(process.argv)
console.log(calculateExercises(hours, target))