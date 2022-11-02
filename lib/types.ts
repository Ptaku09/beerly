export type Beer = {
  id: number;
  name: string;
  tagline: string;
  first_brewed: string;
  description: string;
  image_url: string | null;
  abv: number;
  ibu: number | null;
  target_fg: number | null;
  target_og: number | null;
  ebc: number | null;
  srm: number | null;
  ph: number | null;
  attenuation_level: number | null;
  volume: {
    value: number | null;
    unit: string | null;
  };
  boil_volume: {
    value: number | null;
    unit: string | null;
  };
  method: {
    mash_temp: {
      temp: {
        value: number | null;
        unit: string | null;
      };
      duration: number | null;
    }[];
    fermentation: {
      temp: {
        value: number | null;
        unit: string | null;
      };
    };
    twist: string | null;
  };
  ingredients: {
    malt: {
      name: string;
      amount: {
        value: number;
        unit: string;
      };
    }[];
    hops: {
      name: string;
      amount: {
        value: number;
        unit: string;
      };
      add: string;
      attribute: string;
    }[];
    yeast: string | null;
  };
  food_pairing: string[];
  brewers_tips: string;
};
