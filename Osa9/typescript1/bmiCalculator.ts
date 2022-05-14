interface Arguments {
  height: number;
  weight: number;
}

const calculateBmi = (height : number, weight : number) : string => {
  if (height === 0) {
    throw new Error("height can not equal zero");
  }
  const bmi = weight / (height * height / 10000);
  if (bmi < 25) {
    return "Normal. BMI is " + Math.round(bmi*100)/100;
  } else if (bmi < 29) {
    return "Overweight. BMI is " + Math.round(bmi*100)/100;
  } else {
    return "Obese. BMI is " + Math.round(bmi*100)/100;
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseArguments = (args: Array<any>): Arguments => {
  if (args.length < 4) throw new Error("not enough arguments");
  if(isNaN(Number(args[2])) || isNaN(Number(args[3]))) throw new Error("given arguments are not numbers");
  return {
    height: Number(args[2]),
    weight: Number(args[3])
  };
};

try {
  const {height, weight} = parseArguments(process.argv);
  console.log(calculateBmi(height, weight));
} catch(error: unknown) {
  if (error instanceof Error) {
    console.log('Error:', error.message);
  }
}

export default {
  parseArguments,
  calculateBmi
};