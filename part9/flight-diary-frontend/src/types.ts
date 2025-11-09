export const weatherList = ['sunny', 'rainy', 'cloudy', 'stormy', 'windy'] as const;

export type Weather = (typeof weatherList)[number];

export const visibilityList = ['great', 'good', 'ok', 'poor'] as const;

export type Visibility = (typeof visibilityList)[number];

export interface DiaryEntry {
    id: number;
    date: string;
    weather: Weather;
    visibility: Visibility;
    comment: string
}

export type NewDiaryEntry = Omit<DiaryEntry, 'id'>;

export type NonSensitiveDiaryEntry = Omit<DiaryEntry, 'comment'>;
