import type { ContentSection, Tool } from "@/lib/types";

const mifflin: ContentSection = {
  heading: "Formula used",
  paragraphs: [
    "BMR is estimated with the Mifflin-St Jeor equation, which research has found to be among the most accurate for healthy adults: men: 10 × weight (kg) + 6.25 × height (cm) − 5 × age + 5; women: 10 × weight (kg) + 6.25 × height (cm) − 5 × age − 161.",
    "Daily energy needs (TDEE) are BMR multiplied by an activity factor: 1.2 (sedentary), 1.375 (light), 1.55 (moderate), 1.725 (very active), 1.9 (extra active).",
  ],
};

const estimateNote: ContentSection = {
  heading: "Limits of these estimates",
  paragraphs: [
    "Formulas describe averages. Your real needs can differ by 10% or more depending on body composition, genetics, medical conditions and medications. Use the result as a starting point, track your progress for a few weeks and adjust. Pregnant or breastfeeding women, children, and people with medical conditions should ask a doctor or registered dietitian.",
  ],
};

const healthRelated = ["calorie-calculator", "bmi-calculator", "bmr-calculator", "tdee-calculator", "macro-calculator", "protein-calculator", "calorie-deficit-calculator", "ideal-weight-calculator"];
const rel = (self: string) => healthRelated.filter((s) => s !== self).slice(0, 5);

export const healthTools: Tool[] = [
  {
    slug: "health-calculator",
    category: "health",
    name: "Health & Fitness Calculator",
    h1: "Health & Fitness Calculator",
    title: "Health Calculator – Calories, BMI, BMR, TDEE & Macros",
    updated: "2026-10-25",
    metaDescription:
      "All-in-one health calculator: daily calories, BMI, BMR, TDEE, macros, protein, calorie deficit and ideal weight. Free, metric and imperial units.",
    short: "Calculate calories, BMI, BMR, TDEE and more.",
    intro:
      "Choose a calculator below to estimate your calorie needs, BMI, metabolic rate, macros or ideal weight. Works in metric and imperial units. Your numbers are calculated on your device and are not stored.",
    widget: { type: "health", hub: true, calc: "calorie" },
    primary: true,
    disclaimer: true,
    howTo: [
      "Choose a calculator tab.",
      "Pick your units (kg + cm, kg + feet or lb + feet) and enter your details.",
      "Press “Calculate” to see your results and what they mean.",
    ],
    sections: [
      {
        heading: "Which calculator should I use?",
        list: [
          "Calorie Calculator: how many calories to eat to maintain, lose or gain weight.",
          "BMI Calculator: a quick screening of weight relative to height.",
          "BMR Calculator: calories your body burns at complete rest.",
          "TDEE Calculator: total calories you burn per day including activity.",
          "Macro Calculator: daily protein, carbohydrate and fat targets.",
          "Protein Calculator: daily protein needs based on activity and goal.",
          "Calorie Deficit Calculator: daily calories for a chosen rate of weight loss.",
          "Ideal Weight Calculator: weight ranges from four common formulas and BMI.",
        ],
      },
      mifflin,
      estimateNote,
    ],
    faqs: [
      { q: "Are these calculators accurate?", a: "They use well-established formulas, but they give estimates. Individual results vary." },
      { q: "Is my data saved?", a: "No. Calculations run in your browser and nothing you enter is stored or sent to us." },
      { q: "Can I use kg with feet, or pounds?", a: "Yes. Choose “kg + feet” to enter kilograms with height in feet and inches, or “lb + feet” for pounds." },
    ],
    related: ["calorie-calculator", "bmi-calculator", "tdee-calculator", "macro-calculator", "protein-calculator"],
    keywords: ["health", "fitness", "calculator", "calories", "bmi", "bmr", "tdee", "macros", "weight"],
  },
  {
    slug: "calorie-calculator",
    category: "health",
    name: "Calorie Calculator",
    h1: "Calorie Calculator",
    title: "Calorie Calculator to Lose or Gain Weight – Free",
    updated: "2026-10-25",
    metaDescription:
      "Free calorie calculator for weight loss and weight gain. Find how many calories you need per day from your age, height, weight and activity, in kg or lbs.",
    short: "Find your daily calories to maintain, lose or gain weight.",
    intro:
      "Estimate your daily calorie needs from your age, sex, height, weight and activity level. You get your maintenance calories and targets for losing or gaining weight.",
    widget: { type: "health", calc: "calorie" },
    popular: true,
    disclaimer: true,
    howTo: [
      "Enter your age, sex, height and weight.",
      "Choose the activity level that best matches a typical week.",
      "Press “Calculate” to see maintenance calories and weight loss or gain targets.",
    ],
    sections: [
      mifflin,
      {
        heading: "Understanding the targets",
        list: [
          "Maintain: calories to keep your current weight.",
          "Mild weight loss: about 250 kcal below maintenance (≈0.25 kg / 0.5 lb per week).",
          "Weight loss: about 500 kcal below maintenance (≈0.5 kg / 1 lb per week).",
          "Weight gain: 250–500 kcal above maintenance, ideally combined with strength training.",
        ],
      },
      {
        heading: "Minimum intake",
        paragraphs: [
          "Eating too little can make it hard to get enough nutrients. Health organizations commonly suggest not going below about 1,200 kcal per day for women and 1,500 kcal per day for men without medical supervision. The calculator warns you if a target falls below these levels.",
        ],
      },
      estimateNote,
    ],
    examples: [
      "A 30-year-old woman, 165 cm, 68 kg, moderately active: BMR ≈ 1,400 kcal, maintenance ≈ 2,170 kcal.",
      "A 40-year-old man, 180 cm, 90 kg, lightly active: BMR ≈ 1,830 kcal, maintenance ≈ 2,520 kcal.",
    ],
    faqs: [
      { q: "How many calories should I eat to gain weight?", a: "Eat about 250–500 kcal above your maintenance calories and combine it with strength training, so most of the gain is muscle rather than fat." },
      { q: "How many calories should I eat to lose weight?", a: "A common approach is about 500 kcal below your maintenance calories, which leads to roughly 0.5 kg (1 lb) of weight loss per week." },
      { q: "Which activity level should I choose?", a: "Be conservative. Most people with desk jobs who exercise 2–3 times a week fit “Lightly active”." },
      { q: "Why does my weight not change as predicted?", a: "Water, food volume and hormones cause day-to-day swings. Judge progress over 2–4 weeks and adjust by 100–200 kcal if needed." },
    ],
    related: rel("calorie-calculator"),
    keywords: ["calorie", "calories", "kcal", "maintenance", "weight loss", "diet"],
  },
  {
    slug: "bmi-calculator",
    category: "health",
    name: "BMI Calculator",
    h1: "BMI Calculator",
    title: "BMI Calculator in kg and Feet – For Men & Women",
    updated: "2026-10-25",
    metaDescription:
      "Free BMI calculator for men and women. Enter weight in kg or lbs and height in cm or feet/inches to get your body mass index, category and healthy weight.",
    short: "Calculate your Body Mass Index and category.",
    intro: "Calculate your Body Mass Index from your height and weight and see which adult weight category it falls into.",
    widget: { type: "health", calc: "bmi" },
    popular: true,
    disclaimer: true,
    howTo: ["Choose your units: kg + cm, kg + feet or lb + feet.", "Enter your height and weight.", "Press “Calculate” to see your BMI and category."],
    sections: [
      {
        heading: "BMI formula and categories",
        paragraphs: ["BMI = weight (kg) ÷ height (m)². The World Health Organization uses these adult categories:"],
        list: [
          "Below 18.5: underweight",
          "18.5 – 24.9: healthy weight",
          "25.0 – 29.9: overweight",
          "30.0 and above: obesity",
        ],
      },
      {
        heading: "BMI in kg and feet",
        paragraphs: [
          "Many people know their weight in kilograms but their height in feet and inches. Choose “kg + feet” to enter exactly that, or use “kg + cm” or “lb + feet” – the calculator converts everything for you. For example, 5 ft 6 in is 167.6 cm; at 70 kg that gives a BMI of 24.9.",
        ],
      },
      {
        heading: "BMI for men, women and different ages",
        paragraphs: [
          "For adults aged 18 and over, the same BMI categories apply to men and women and do not change with age. Women naturally carry more body fat than men at the same BMI, and older adults may carry more fat for the same BMI, which is why BMI is a screening number, not a diagnosis.",
          "For people of South Asian, Chinese and other Asian backgrounds, the WHO suggests extra cut-off points: 23 as increased risk and 27.5 as high risk.",
        ],
      },
      {
        heading: "What BMI does not tell you",
        paragraphs: [
          "BMI does not distinguish muscle from fat, so muscular people can have a high BMI while being healthy. It also does not show where fat is stored. Some health bodies use lower thresholds for people of Asian descent (for example 23 for overweight). BMI categories do not apply to children and teens, who need age-specific charts.",
        ],
      },
    ],
    faqs: [
      { q: "How do I calculate BMI with weight in kg and height in feet?", a: "Select “kg + feet”, enter your weight in kilograms and your height in feet and inches, then press “Calculate”. You can also use kg + cm or lb + feet." },
      { q: "Is BMI different for men and women?", a: "No. Adult BMI uses the same formula and categories for men and women, although body fat at the same BMI differs." },
      { q: "What is a healthy BMI?", a: "For most adults, a BMI between 18.5 and 24.9 is considered a healthy range." },
      { q: "Is BMI accurate for athletes?", a: "Not always. Muscle weighs more than fat, so athletes can have a high BMI without excess body fat." },
      { q: "Can children use this calculator?", a: "No. Children and teenagers need BMI-for-age percentile charts." },
    ],
    related: rel("bmi-calculator"),
    keywords: ["bmi", "body mass index", "weight", "obesity", "overweight"],
  },
  {
    slug: "bmr-calculator",
    category: "health",
    name: "BMR Calculator",
    h1: "BMR Calculator",
    title: "BMR Calculator – Basal Metabolic Rate (Mifflin-St Jeor)",
    metaDescription:
      "Calculate your Basal Metabolic Rate (BMR), the calories your body burns at rest, using the Mifflin-St Jeor equation.",
    short: "Calories your body burns at complete rest.",
    intro: "Your Basal Metabolic Rate is the energy your body uses at complete rest to keep you alive: breathing, circulation and cell repair.",
    widget: { type: "health", calc: "bmr" },
    disclaimer: true,
    howTo: ["Enter age, sex, height and weight.", "Press “Calculate” to see your BMR in kcal per day."],
    sections: [
      mifflin,
      {
        heading: "BMR vs TDEE",
        paragraphs: [
          "BMR is only the energy used at rest. You also burn calories by moving, exercising and digesting food. Total Daily Energy Expenditure (TDEE) includes all of that, and it is the number to use when planning how much to eat.",
        ],
      },
    ],
    faqs: [
      { q: "Should I eat my BMR in calories?", a: "Generally no. Eating only your BMR is below your total needs. Use the TDEE or Calorie Calculator for intake targets." },
      { q: "Why does BMR go down with age?", a: "Muscle mass tends to decrease with age, which lowers resting energy use." },
    ],
    related: rel("bmr-calculator"),
    keywords: ["bmr", "basal metabolic rate", "metabolism", "resting"],
  },
  {
    slug: "tdee-calculator",
    category: "health",
    name: "TDEE Calculator",
    h1: "TDEE Calculator",
    title: "TDEE Calculator – Total Daily Energy Expenditure",
    metaDescription:
      "Calculate your Total Daily Energy Expenditure (TDEE) and see calories burned at each activity level. Free TDEE calculator.",
    short: "Total calories you burn per day with activity.",
    intro: "TDEE is the total number of calories you burn in a day, including exercise and daily movement. It is your maintenance calorie level.",
    widget: { type: "health", calc: "tdee" },
    disclaimer: true,
    howTo: ["Enter your details and activity level.", "Press “Calculate” to see your TDEE and a comparison of all activity levels."],
    sections: [
      mifflin,
      {
        heading: "Activity levels explained",
        list: [
          "Sedentary: desk job, little or no exercise.",
          "Lightly active: light exercise 1–3 days a week.",
          "Moderately active: moderate exercise 3–5 days a week.",
          "Very active: hard exercise 6–7 days a week.",
          "Extra active: physical job plus hard training.",
        ],
      },
      estimateNote,
    ],
    faqs: [
      { q: "How do I use TDEE to lose weight?", a: "Eat below your TDEE. A 500 kcal daily deficit leads to about 0.5 kg (1 lb) loss per week." },
      { q: "Is TDEE the same as maintenance calories?", a: "Yes. Eating at your TDEE should keep your weight stable." },
    ],
    related: rel("tdee-calculator"),
    keywords: ["tdee", "total daily energy expenditure", "maintenance calories", "activity"],
  },
  {
    slug: "macro-calculator",
    category: "health",
    name: "Macro Calculator",
    h1: "Macro Calculator",
    title: "Macro Calculator – Protein, Carbs and Fat Targets",
    metaDescription:
      "Calculate daily protein, carbohydrate and fat targets in grams for weight loss, maintenance or muscle gain.",
    short: "Daily protein, carbs and fat in grams for your goal.",
    intro: "Get daily protein, carbohydrate and fat targets in grams based on your calorie needs and goal.",
    widget: { type: "health", calc: "macro" },
    disclaimer: true,
    howTo: ["Enter your details and activity level.", "Choose your goal: lose, maintain or gain.", "Press “Calculate” to see grams and calories for each macro."],
    sections: [
      {
        heading: "How macros are calculated",
        list: [
          "Calories: your TDEE, minus 500 kcal to lose weight or plus 300 kcal to gain.",
          "Protein: 1.6 g per kg body weight (2.0 g/kg when losing weight, to help preserve muscle).",
          "Fat: 25% of calories (at least 0.6 g per kg).",
          "Carbohydrates: the remaining calories.",
          "Protein and carbohydrates have 4 kcal per gram; fat has 9 kcal per gram.",
        ],
      },
      estimateNote,
    ],
    faqs: [
      { q: "Do I need to hit my macros exactly?", a: "No. Staying within about 10% of each target on most days is enough for good results." },
      { q: "Is this suitable for keto?", a: "No. Keto diets use very low carbohydrate targets, which this calculator does not apply." },
    ],
    related: rel("macro-calculator"),
    keywords: ["macro", "macros", "protein", "carbs", "fat", "grams", "iifym"],
  },
  {
    slug: "protein-calculator",
    category: "health",
    name: "Protein Calculator",
    h1: "Protein Calculator",
    title: "Protein Calculator – How Much Protein Do I Need Per Day?",
    metaDescription:
      "Estimate how much protein you need per day based on your weight, activity and goal. Ranges from 0.8 to 2.2 g per kg.",
    short: "Daily protein needs for your weight and goal.",
    intro: "Estimate your daily protein needs based on your body weight, activity level and goal.",
    widget: { type: "health", calc: "protein" },
    disclaimer: true,
    howTo: ["Enter your weight.", "Choose your activity and goal.", "Press “Calculate” to see your daily protein range."],
    sections: [
      {
        heading: "Protein guidelines used",
        list: [
          "Minimum for sedentary adults: 0.8 g per kg (the RDA).",
          "Regular exercise: 1.2–1.6 g per kg.",
          "Building muscle or losing fat while training: 1.6–2.2 g per kg.",
          "Older adults (65+): at least 1.0–1.2 g per kg is often recommended.",
        ],
      },
      {
        heading: "Spreading protein across meals",
        paragraphs: [
          "Dividing your protein across 3–5 meals of about 20–40 g each is a practical way to reach your target. Good sources include eggs, dairy, fish, chicken, lentils, beans, tofu and Greek yogurt.",
        ],
      },
    ],
    faqs: [
      { q: "Can too much protein be harmful?", a: "Intakes up to about 2.2 g/kg are considered safe for healthy adults. People with kidney disease should consult a doctor." },
      { q: "Should I use my current or goal weight?", a: "If you have a lot of weight to lose, using your goal weight gives a more realistic target." },
    ],
    related: rel("protein-calculator"),
    keywords: ["protein", "grams", "muscle", "diet"],
  },
  {
    slug: "calorie-deficit-calculator",
    category: "health",
    name: "Calorie Deficit Calculator",
    h1: "Calorie Deficit Calculator",
    title: "Calorie Deficit Calculator – Calories to Lose Weight",
    metaDescription:
      "Find how many calories to eat to lose 0.25–1 kg (0.5–2 lb) per week and how long it takes to reach your goal weight.",
    short: "Daily calories and timeline to reach your goal weight.",
    intro: "Choose a weekly weight loss rate to see your daily calorie target and an estimated date to reach your goal weight.",
    widget: { type: "health", calc: "deficit" },
    popular: true,
    disclaimer: true,
    howTo: [
      "Enter your details, activity level and goal weight.",
      "Choose a weekly weight loss rate.",
      "Press “Calculate” to see daily calories, the deficit and an estimated timeline.",
    ],
    sections: [
      {
        heading: "How the deficit is calculated",
        paragraphs: [
          "About 7,700 kcal corresponds to 1 kg of body fat (3,500 kcal per pound). A weekly loss of 0.5 kg therefore requires an average deficit of about 550 kcal per day below your TDEE.",
          "Real weight loss slows over time because a lighter body needs fewer calories. Recalculate every 4–5 kg (10 lb) lost.",
        ],
      },
      {
        heading: "Choosing a safe rate",
        paragraphs: [
          "Losing about 0.5–1% of body weight per week is widely considered sustainable. Faster rates increase muscle loss and are harder to maintain. If a target falls below 1,200 kcal (women) or 1,500 kcal (men), the calculator shows a warning.",
        ],
      },
    ],
    faqs: [
      { q: "What is a good calorie deficit?", a: "300–500 kcal per day suits most people and leads to steady, sustainable weight loss." },
      { q: "Is the goal date exact?", a: "No. It is a simple projection. Water weight and metabolic adaptation make real progress uneven." },
    ],
    related: rel("calorie-deficit-calculator"),
    keywords: ["calorie deficit", "weight loss", "lose weight", "diet", "goal weight"],
  },
  {
    slug: "ideal-weight-calculator",
    category: "health",
    name: "Ideal Weight Calculator",
    h1: "Ideal Weight Calculator",
    title: "Ideal Weight Calculator – Healthy Weight for Your Height",
    metaDescription:
      "Estimate an ideal body weight for your height using the Devine, Robinson, Miller and Hamwi formulas plus the healthy BMI range.",
    short: "Healthy weight range for your height.",
    intro: "Estimate an ideal weight for your height using four classic formulas, alongside the healthy weight range based on BMI.",
    widget: { type: "health", calc: "ideal-weight" },
    disclaimer: true,
    howTo: ["Enter your sex and height.", "Press “Calculate” to see results from each formula and the healthy BMI range."],
    sections: [
      {
        heading: "Formulas used",
        paragraphs: ["Each formula starts from a base weight at 5 feet (152.4 cm) and adds weight per inch above that:"],
        list: [
          "Devine (1974): men 50 kg + 2.3 kg/inch; women 45.5 kg + 2.3 kg/inch.",
          "Robinson (1983): men 52 kg + 1.9 kg/inch; women 49 kg + 1.7 kg/inch.",
          "Miller (1983): men 56.2 kg + 1.41 kg/inch; women 53.1 kg + 1.36 kg/inch.",
          "Hamwi (1964): men 48 kg + 2.7 kg/inch; women 45.5 kg + 2.2 kg/inch.",
        ],
      },
      {
        heading: "Use a range, not a single number",
        paragraphs: [
          "These formulas were developed mainly for medication dosing and do not consider body frame or muscle. The healthy BMI range (18.5–24.9) gives a broader, more practical target.",
        ],
      },
    ],
    faqs: [
      { q: "Which formula is best?", a: "None is clearly best. Looking at the range across formulas and the BMI range is more useful than any single result." },
      { q: "Does this work for very short people?", a: "The formulas are designed for heights above 5 feet (152 cm). Below that, use the BMI range." },
    ],
    related: rel("ideal-weight-calculator"),
    keywords: ["ideal weight", "healthy weight", "height", "devine", "robinson"],
  },
];
