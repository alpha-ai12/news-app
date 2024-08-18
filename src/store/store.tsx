import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";

import Code from "../screens/Board/partials/country/code.json";
export const STORE_FEATURE_KEY = "store";
export const storeAdapter = createEntityAdapter();
const API_URL =
  "https://news-backend-7zo8rz1h1-codeninjas-projects.vercel.app/news";
export const getCountryNameFromId = (id: string) => {
  let name = "";
  Code.forEach((i) => {
    const key = Object.keys(i)[0];
    if (i[key] === id) {
      name = key;
    }
  });
  return name;
};
export const randColor = (letter: string) => {
  const code =
    "#" +
    Math.floor((letter.toLowerCase().charCodeAt(0) - 96) * 0.03846 * 16777215)
      .toString(16)
      .padStart(6, "0")
      .toUpperCase();
  return code;
};
export const getMostRecent = createAsyncThunk(
  "store/get/MostRecent",
  async (input, thunkAPI) => {
    const url = `${API_URL}/mostrecent`;
    const response = await axios.get(url, {
      headers: {
        crossDomain: true,
      },
    });
    // console.log("store.mostrecent", response);
    return response.data;
  },
);
export const getNews = createAsyncThunk(
  "store/get/News",
  async (input, thunkAPI) => {
    const url = `${API_URL}`;
    const response = await axios.get(url, {
      params: {
        category: "all",
      },
      headers: {
        crossDomain: true,
      },
    });
    console.log("store.getNews", response);
    return response.data;
  },
);
export const getHealthNews = createAsyncThunk(
  "store/get/HealthNews ",
  async (input: any, thunkAPI) => {
    const url = `${API_URL}`;
    const response = await axios.get(url, {
      headers: {
        crossDomain: true,
      },
      params: {
        category: "health",
        page: input,
      },
    });
    // console.log("store.getNews", response);
    return response.data;
  },
);
export const getBusinessNews = createAsyncThunk(
  "store/get/BusinessNews ",
  async (input: any, thunkAPI) => {
    const url = `${API_URL}`;
    const response = await axios.get(url, {
      headers: {
        crossDomain: true,
      },
      params: {
        category: "business",
        page: input,
      },
    });
    // console.log("store.business", response);
    return response.data;
  },
);
export const getTopNews = createAsyncThunk(
  "store/get/TopNews ",
  async (input: any, thunkAPI) => {
    const url = `${API_URL}`;
    const response = await axios.get(url, {
      headers: {
        crossDomain: true,
      },
      params: {
        category: "top",
        page: input,
      },
    });
    // console.log("store.TopNews", response);
    return response.data;
  },
);
export const getEntertainmentNews = createAsyncThunk(
  "store/get/EntertainmentNews ",
  async (input: any, thunkAPI) => {
    const url = `${API_URL}`;
    const response = await axios.get(url, {
      headers: {
        crossDomain: true,
      },
      params: {
        category: "entertainment",
        page: input,
      },
    });
    // console.log("store.entertainment", response);
    return response.data;
  },
);
export const getPoliticsNews = createAsyncThunk(
  "store/get/PoliticsNews ",
  async (input: any, thunkAPI) => {
    const url = `${API_URL}`;
    const response = await axios.get(url, {
      headers: {
        crossDomain: true,
      },
      params: {
        category: "politics",
        page: input,
      },
    });
    // console.log("store.politics", response);
    return response.data;
  },
);
export const getScienceNews = createAsyncThunk(
  "store/get/ScienceNews ",
  async (input: any, thunkAPI) => {
    const url = `${API_URL}`;
    const response = await axios.get(url, {
      headers: {
        crossDomain: true,
      },
      params: {
        category: "science",
        page: input,
      },
    });
    // console.log("store.science", response);
    return response.data;
  },
);
export const getSportsNews = createAsyncThunk(
  "store/get/SportsNews ",
  async (input: any, thunkAPI) => {
    const url = `${API_URL}`;
    const response = await axios.get(url, {
      headers: {
        crossDomain: true,
      },
      params: {
        category: "sports",
        page: input,
      },
    });
    // console.log("store.sports", response);
    return response.data;
  },
);
export const getTechnologyNews = createAsyncThunk(
  "store/get/TechnologyNews ",
  async (input: any, thunkAPI) => {
    const url = `${API_URL}`;
    const response = await axios.get(url, {
      headers: {
        crossDomain: true,
      },
      params: {
        category: "technology",
        page: input,
      },
    });
    // console.log("store.technology", response);
    return response.data;
  },
);
export const getWorldNews = createAsyncThunk(
  "store/get/WorldNews",
  async (input: any, thunkAPI) => {
    const url = `${API_URL}`;
    const response = await axios.get(url, {
      headers: {
        crossDomain: true,
      },
      params: {
        category: "world",
        page: input,
      },
    });
    // console.log("store.world", response);
    return response.data;
  },
);
export const getFeatureNews = createAsyncThunk(
  "store/get/FeatureNews",
  async (input, thunkAPI) => {
    const url = `${API_URL}/feature`;
    const response = await axios.get(url, {
      headers: {
        crossDomain: true,
      },
      // params: {
      //   image: true,
      // },
    });
    // console.log("store.FeatureNews", response);
    return response.data.data;
  },
);
export const getIndiaNews = createAsyncThunk(
  "store/get/IndiaNews",
  async (input: any, thunkAPI) => {
    const url = `${API_URL}/region`;
    const response = await axios.get(url, {
      headers: {
        crossDomain: true,
      },
      params: {
        country: "in",
        page: input,
      },
    });
    // console.log("store.world", response);
    return response.data.data;
  },
);
export const getUSANews = createAsyncThunk(
  "store/get/USANews",
  async (input: any, thunkAPI) => {
    const url = `${API_URL}/region`;
    const response = await axios.get(url, {
      headers: {
        crossDomain: true,
      },
      params: {
        country: "us",
        page: input,
      },
    });
    // console.log("store.world", response);
    return response.data.data;
  },
);
export const fetchStore = createAsyncThunk(
  "store/fetchStatus",
  async (_, thunkAPI) => {
    /**
     * Replace this with your custom fetch call.
     * For example, `return myApi.getStores()`;
     * Right now we just return an empty array.
     */
    return Promise.resolve([]);
  },
);
export const regionNews = createAsyncThunk(
  "store/get/regionNews",
  async (input: any, thunkAPI) => {
    // console.log("regionNews", input);
    const url = `${API_URL}/region`;
    const response = await axios.get(url, {
      headers: {
        crossDomain: true,
      },
      params: {
        country: input.region,
        page: input.page,
      },
    });
    // console.log("store.world", response);
    return response.data.data;
  },
);
export const localNews = createAsyncThunk(
  "store/get/localNews",
  async (input: any, thunkAPI) => {
    // console.log("localNews", input);
    const url = `${API_URL}/region`;
    const response = await axios.get(url, {
      headers: {
        crossDomain: true,
      },
      params: {
        country: input,
        page: 1,
      },
    });
    // console.log("store.world", response);
    return response.data.data;
  },
);
export const userAPI = createAsyncThunk(
  "store/post/user",
  async (input: any, thunkAPI) => {
    const url = `https://dev-api.opennewsai.com/user`;
    const response = await axios.post(url, input, {
      headers: {
        crossDomain: true,
      },
    });
    // console.log("user", response);

    return response;
  },
);
export const userLogin = createAsyncThunk(
  "store/post/userLogin",
  async (input: any, thunkAPI) => {
    try {
      const url = `https://dev-api.opennewsai.com/user/login`;
      const response = await axios.post(url, input, {
        headers: {
          crossDomain: true,
          "Content-Type": "application/json",
        },
      });

      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  },
);
export const userSignUp = createAsyncThunk(
  "store/post/userSignUp",
  async (input: any, thunkAPI) => {
    try {
      const url = `https://dev-api.opennewsai.com/user`;
      const response = await axios.post(url, input, {
        headers: {
          crossDomain: true,
        },
      });
      // console.log("user", response);
      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  },
);
export const forgetPass = createAsyncThunk(
  "store/post/forgetPass",
  async (input: any, thunkAPI) => {
    try {
      const url = `https://dev-api.opennewsai.com/user/forgot-password/${input}`;
      const response = await axios.get(url, {
        headers: {
          crossDomain: true,
        },
      });
      // console.log("user forget", response);
      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  },
);
export const nonceCheck = createAsyncThunk(
  "store/post/nonceCheck",
  async (input: any, thunkAPI) => {
    try {
      const url = `https://dev-api.opennewsai.com/user/verify-token/${input}`;
      const response = await axios.get(url, {
        headers: {
          crossDomain: true,
        },
      });
      // console.log("user Nonce", response);
      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  },
);
export const resetPassword = createAsyncThunk(
  "store/post/resetPassword",
  async (input: any, thunkAPI) => {
    try {
      const url = `https://dev-api.opennewsai.com/user/reset-password/`;
      const response = await axios.post(url, input, {
        headers: {
          crossDomain: true,
        },
      });
      // console.log("user reset", response);
      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  },
);
export const changePreferences = createAsyncThunk(
  "store/user/changePreferences",
  async (input: any, thunkAPI) => {
    try {
      const url = `https://dev-api.opennewsai.com/user/preference`;
      const response = await axios.post(url, input, {
        headers: {
          crossDomain: true,
        },
      });
      // console.log("user reset", response);
      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  },
);
export const saveNews = createAsyncThunk(
  "store/user/save",
  async (input: any, thunkAPI) => {
    try {
      const url = `https://dev-api.opennewsai.com/user/save-news`;
      const response = await axios.post(url, input, {
        headers: {
          crossDomain: true,
        },
      });
      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  },
);
export const unSaveNews = createAsyncThunk(
  "store/user/unSave",
  async (input: any, thunkAPI) => {
    try {
      const url = `https://dev-api.opennewsai.com/user/unsave-news`;
      const response = await axios.put(url, input, {
        headers: {
          crossDomain: true,
        },
      });
      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  },
);

export const userDataAPI = createAsyncThunk(
  "store/user/data",
  async (input: any, thunkAPI) => {
    try {
      const url = `https://dev-api.opennewsai.com/user`;
      const response = await axios.get(url, {
        headers: {
          crossDomain: true,
        },
        params: {
          email: input.email,
          oAuth: input.oAuth,
        },
      });
      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  },
);
export const contactApi = createAsyncThunk(
  "store/user/contact",
  async (input: any, thunkAPI) => {
    try {
      const url = `https://dev-api.opennewsai.com/user/contact-us`;
      const response = await axios.post(url, input, {
        headers: {
          crossDomain: true,
        },
      });
      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  },
);
export const helpApi = createAsyncThunk(
  "store/user/contact",
  async (input: any, thunkAPI) => {
    try {
      const url = `https://dev-api.opennewsai.com/user/help-center`;
      const response = await axios.post(url, input, {
        headers: {
          crossDomain: true,
        },
      });
      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  },
);
export const countryNews = createAsyncThunk(
  "store/get/countryNews",
  async (input: any, thunkAPI) => {
    // console.log("conntry", input);
    const url = `${API_URL}/region`;
    const response = await axios.get(url, {
      headers: {
        crossDomain: true,
      },
      params: {
        country: input.region,
        page: input.page,
      },
    });
    // console.log("store.world", response.data.data.length);
    return response.data.data;
  },
);
interface storeState {
  loadingStatus: "not loaded" | "loading" | "loaded" | "error";
  error: any;
  getNewsStatus: "not loaded" | "loading" | "loaded" | "error";
  newsData: any;
  selectedNews: any;
  getBusinessNewsStatus: "not loaded" | "loading" | "loaded" | "error";
  businessNewsData: any;
  getTopNewsStatus: "not loaded" | "loading" | "loaded" | "error";
  topNewsData: any;
  healthNewsStatus: "not loaded" | "loading" | "loaded" | "error";
  healthNewsData: any;
  entertainmentNewsStatus: "not loaded" | "loading" | "loaded" | "error";
  entertainmentNewsData: any;
  politicsNewsStatus: "not loaded" | "loading" | "loaded" | "error";
  politicsNewsData: any;
  scienceNewsStatus: "not loaded" | "loading" | "loaded" | "error";
  scienceNewsData: any;
  sportsNewsStatus: "not loaded" | "loading" | "loaded" | "error";
  sportsNewsData: any;
  technologyNewsStatus: "not loaded" | "loading" | "loaded" | "error";
  technologyNewsData: any;
  worldNewsStatus: "not loaded" | "loading" | "loaded" | "error";
  worldNewsData: any;
  featureStatus: "not loaded" | "loading" | "loaded" | "error";
  featureData: any;
  indiaStatus: "not loaded" | "loading" | "loaded" | "error";
  indiaData: any;
  usaStatus: "not loaded" | "loading" | "loaded" | "error";
  usaData: any;
  recentNewsStatus: "not loaded" | "loading" | "loaded" | "error";
  recentNewsData: any;
  regionNewsStatus: "not loaded" | "loading" | "loaded" | "error";
  regionNewsData: any;
  localNewsStatus: "not loaded" | "loading" | "loaded" | "error";
  localNewsData: any;
  userDataStatus: "not loaded" | "loading" | "loaded" | "error";
  userData: any;
  regionCode: string;
  userAPIData: any;
  userAPIStatus: "not loaded" | "loading" | "loaded" | "error";
  preferences: { preferredCategory: any; preferredCountry: any };
  countryNewsStatus: "not loaded" | "loading" | "loaded" | "error";
  countryNewsData: any;
}
export const initialStoreState = storeAdapter.getInitialState({
  loadingStatus: "not loaded",
  error: null,
  getNewsStatus: "not loaded",
  newsData: [],
  selectedNews: {},
  getBusinessNewsStatus: "not loaded",
  businessNewsData: [],
  getTopNewsStatus: "not loaded",
  topNewsData: [],
  healthNewsStatus: "not loaded",
  healthNewsData: [],
  entertainmentNewsStatus: "not loaded",
  entertainmentNewsData: [],
  politicsNewsStatus: "not loaded",
  politicsNewsData: [],
  scienceNewsStatus: "not loaded",
  scienceNewsData: [],
  technologyNewsStatus: "not loaded",
  technologyNewsData: [],
  sportsNewsStatus: "not loaded",
  sportsNewsData: [],
  worldNewsStatus: "not loaded",
  worldNewsData: [],
  featureStatus: "not loaded",
  featureData: {},
  indiaStatus: "not loaded",
  indiaData: [],
  usaStatus: "not loaded",
  usaData: [],
  recentNewsStatus: "not loaded",
  recentNewsData: [],
  regionNewsStatus: "not loaded",
  regionNewsData: [],
  localNewsStatus: "not loaded",
  localNewsData: [],
  userDataStatus: "not loaded",
  userData: {},
  regionCode: "in",
  userAPIData: {},
  userAPIStatus: "not loaded",
  preferences: {
    preferredCategory: [],
    preferredCountry: [],
  },
  countryNewsStatus: "not loaded",
  countryNewsData: [],
} as storeState);
export const storeSlice = createSlice({
  name: STORE_FEATURE_KEY,
  initialState: initialStoreState,
  reducers: {
    add: storeAdapter.addOne,
    remove: storeAdapter.removeOne,
    setLoadingStatus: (state, action) => {
      state.loadingStatus = action.payload;
    },
    setSelectedNews: (state, action) => {
      // console.log("setSelectedNews", action.payload);
      state.selectedNews = action.payload;
    },
    setRegionCode: (state, action) => {
      state.regionCode = action.payload;
    },
    setLocalNewsData: (state, action) => {
      state.regionCode = action.payload;
    },
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setRegionNewsData: (state, action) => {
      state.regionNewsData = action.payload;
    },
    setCountryNewsData: (state, action) => {
      state.countryNewsData = action.payload;
    },
    setPreferences: (state, action) => {
      state.preferences = action.payload;
    },
    setBusinessNewsData: (state, action) => {
      state.businessNewsData = action.payload;
    },
    setEntertainmentNewsData: (state, action) => {
      state.entertainmentNewsData = action.payload;
    },
    setHealthNewsData: (state, action) => {
      state.healthNewsData = action.payload;
    },
    setPoliticsNewsData: (state, action) => {
      state.politicsNewsData = action.payload;
    },
    setScienceNewsData: (state, action) => {
      state.scienceNewsData = action.payload;
    },
    setSportsNewsData: (state, action) => {
      state.sportsNewsData = action.payload;
    },
    setTechnologyNewsData: (state, action) => {
      state.technologyNewsData = action.payload;
    },
    setWorldNewsData: (state, action) => {
      state.worldNewsData = action.payload;
    },
    setRecentNewsData: (state, action) => {
      state.recentNewsData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStore.pending, (state) => {
        state.loadingStatus = "loading";
      })
      .addCase(fetchStore.fulfilled, (state, action) => {
        storeAdapter.setAll(state, action.payload);
        state.loadingStatus = "loaded";
      })
      .addCase(fetchStore.rejected, (state, action) => {
        state.loadingStatus = "error";
        state.error = action.error.message ?? "";
      })
      .addCase(getNews.pending, (state) => {
        state.getNewsStatus = "loading";
      })
      .addCase(getNews.fulfilled, (state, action) => {
        state.newsData = action.payload ?? {};
        state.getNewsStatus = "loaded";
      })
      .addCase(getNews.rejected, (state, action) => {
        state.getNewsStatus = "error";
        state.error = action.error.message ?? "";
      })
      .addCase(getBusinessNews.pending, (state) => {
        state.getBusinessNewsStatus = "loading";
      })
      .addCase(getBusinessNews.fulfilled, (state, action) => {
        const array = state.businessNewsData;
        const newArray = array.concat(action.payload);

        state.businessNewsData = newArray ?? [];
        state.getBusinessNewsStatus = "loaded";
      })
      .addCase(getBusinessNews.rejected, (state, action) => {
        state.getBusinessNewsStatus = "error";
        state.error = action.error.message ?? "";
      })
      .addCase(getTopNews.pending, (state) => {
        state.getTopNewsStatus = "loading";
      })
      .addCase(getTopNews.fulfilled, (state, action) => {
        const array = state.topNewsData;
        const newArray = array.concat(action.payload);
        state.topNewsData = newArray ?? [];
        state.getTopNewsStatus = "loaded";
      })
      .addCase(getTopNews.rejected, (state, action) => {
        state.getTopNewsStatus = "error";
        state.error = action.error.message ?? "";
      })
      .addCase(getHealthNews.pending, (state) => {
        state.healthNewsStatus = "loading";
      })
      .addCase(getHealthNews.fulfilled, (state, action) => {
        const array = state.healthNewsData;
        const newArray = array.concat(action.payload);
        state.healthNewsData = newArray ?? [];
        state.healthNewsStatus = "loaded";
      })
      .addCase(getHealthNews.rejected, (state, action) => {
        state.healthNewsStatus = "error";
        state.error = action.error.message ?? "";
      })
      .addCase(getEntertainmentNews.pending, (state) => {
        state.entertainmentNewsStatus = "loading";
      })
      .addCase(getEntertainmentNews.fulfilled, (state, action) => {
        const array = state.entertainmentNewsData;
        const newArray = array.concat(action.payload);
        state.entertainmentNewsData = newArray ?? [];
        state.entertainmentNewsStatus = "loaded";
      })
      .addCase(getEntertainmentNews.rejected, (state, action) => {
        state.entertainmentNewsStatus = "error";
        state.error = action.error.message ?? "";
      })
      .addCase(getPoliticsNews.pending, (state) => {
        state.politicsNewsStatus = "loading";
      })
      .addCase(getPoliticsNews.fulfilled, (state, action) => {
        const array = state.politicsNewsData;
        const newArray = array.concat(action.payload);
        state.politicsNewsData = newArray ?? [];
        state.politicsNewsStatus = "loaded";
      })
      .addCase(getPoliticsNews.rejected, (state, action) => {
        state.politicsNewsStatus = "error";
        state.error = action.error.message ?? "";
      })
      .addCase(getScienceNews.pending, (state) => {
        state.scienceNewsStatus = "loading";
      })
      .addCase(getScienceNews.fulfilled, (state, action) => {
        const array = state.scienceNewsData;
        const newArray = array.concat(action.payload);
        state.scienceNewsData = newArray ?? [];
        state.scienceNewsStatus = "loaded";
      })
      .addCase(getScienceNews.rejected, (state, action) => {
        state.scienceNewsStatus = "error";
        state.error = action.error.message ?? "";
      })
      .addCase(getSportsNews.pending, (state) => {
        state.sportsNewsStatus = "loading";
      })
      .addCase(getSportsNews.fulfilled, (state, action) => {
        const array = state.sportsNewsData;
        const newArray = array.concat(action.payload);
        state.sportsNewsData = newArray ?? [];
        state.sportsNewsStatus = "loaded";
      })
      .addCase(getSportsNews.rejected, (state, action) => {
        state.sportsNewsStatus = "error";
        state.error = action.error.message ?? "";
      })
      .addCase(getTechnologyNews.pending, (state) => {
        state.technologyNewsStatus = "loading";
      })
      .addCase(getTechnologyNews.fulfilled, (state, action) => {
        const array = state.technologyNewsData;
        const newArray = array.concat(action.payload);
        state.technologyNewsData = newArray ?? [];
        state.technologyNewsStatus = "loaded";
      })
      .addCase(getTechnologyNews.rejected, (state, action) => {
        state.technologyNewsStatus = "error";
        state.error = action.error.message ?? "";
      })
      .addCase(getWorldNews.pending, (state) => {
        state.worldNewsStatus = "loading";
      })
      .addCase(getWorldNews.fulfilled, (state, action) => {
        const array = state.worldNewsData;
        const newArray = array.concat(action.payload);
        state.worldNewsData = newArray ?? [];
        state.worldNewsStatus = "loaded";
      })
      .addCase(getWorldNews.rejected, (state, action) => {
        state.worldNewsStatus = "error";
        state.error = action.error.message ?? "";
      })
      .addCase(getFeatureNews.pending, (state) => {
        state.featureStatus = "loading";
      })
      .addCase(getFeatureNews.fulfilled, (state, action) => {
        state.featureData = action.payload ?? {};
        state.featureStatus = "loaded";
      })
      .addCase(getFeatureNews.rejected, (state, action) => {
        state.featureStatus = "error";
        state.error = action.error.message ?? "";
      })
      .addCase(getIndiaNews.pending, (state) => {
        state.indiaStatus = "loading";
      })
      .addCase(getIndiaNews.fulfilled, (state, action) => {
        const array = state.indiaData;
        const newArray = array.concat(action.payload);
        state.indiaData = newArray ?? [];
        state.indiaStatus = "loaded";
      })
      .addCase(getIndiaNews.rejected, (state, action) => {
        state.indiaStatus = "error";
        state.error = action.error.message ?? "";
      })
      .addCase(getUSANews.pending, (state) => {
        state.usaStatus = "loading";
      })
      .addCase(getUSANews.fulfilled, (state, action) => {
        const array = state.usaData;
        const newArray = array.concat(action.payload);
        state.usaData = newArray ?? [];
        state.usaStatus = "loaded";
      })
      .addCase(getUSANews.rejected, (state, action) => {
        state.usaStatus = "error";
        state.error = action.error.message ?? "";
      })
      .addCase(getMostRecent.pending, (state) => {
        state.recentNewsStatus = "loading";
      })
      .addCase(getMostRecent.fulfilled, (state, action) => {
        state.recentNewsData = action.payload ?? {};
        state.recentNewsStatus = "loaded";
      })
      .addCase(getMostRecent.rejected, (state, action) => {
        state.recentNewsStatus = "error";
        state.error = action.error.message ?? "";
      })
      .addCase(regionNews.pending, (state) => {
        state.regionNewsStatus = "loading";
      })
      .addCase(regionNews.fulfilled, (state, action) => {
        const array = state.regionNewsData;
        if (
          state.regionNewsData[0]?.country.includes(
            getCountryNameFromId(action.meta.arg.region).toLowerCase(),
          )
        ) {
          const newArray = array.concat(action.payload);
          state.regionNewsData = newArray ?? [];
        } else {
          state.regionNewsData = action.payload ?? [];
        }
        // state.regionNewsData = action.payload ?? {};
        state.regionNewsStatus = "loaded";
      })
      .addCase(regionNews.rejected, (state, action) => {
        state.regionNewsStatus = "error";
        state.error = action.error.message ?? "";
      })
      .addCase(localNews.pending, (state) => {
        state.localNewsStatus = "loading";
      })
      .addCase(localNews.fulfilled, (state, action) => {
        state.localNewsData = action.payload ?? [];
        state.localNewsStatus = "loaded";
      })
      .addCase(localNews.rejected, (state, action) => {
        state.localNewsStatus = "error";
        state.error = action.error.message ?? "";
      })
      .addCase(userAPI.pending, (state) => {
        state.userAPIStatus = "loading";
      })
      .addCase(userAPI.fulfilled, (state, action) => {
        state.userAPIData = action.payload ?? [];
        state.userAPIStatus = "loaded";
        // console.log("action.payload ", action.payload);
        // state.preferences={preferredCategory:action.payload.}
      })
      .addCase(userAPI.rejected, (state, action) => {
        state.userAPIStatus = "error";
        state.error = action.error.message ?? "";
      })
      .addCase(countryNews.pending, (state) => {
        state.countryNewsStatus = "loading";
      })
      .addCase(countryNews.fulfilled, (state, action) => {
        const array = state.countryNewsData;
        if (
          state.countryNewsData[0]?.country.includes(
            getCountryNameFromId(action.meta.arg.region).toLowerCase(),
          )
        ) {
          const newArray = array.concat(action.payload);
          state.countryNewsData = newArray ?? [];
        } else {
          state.countryNewsData = action.payload ?? [];
        }
        // state.countryNewsData = action.payload ?? {};
        state.countryNewsStatus = "loaded";
      })
      .addCase(countryNews.rejected, (state, action) => {
        state.countryNewsStatus = "error";
        state.error = action.error.message ?? "";
      });
  },
});
export const storeReducer = storeSlice.reducer;
export const storeActions = storeSlice.actions;
const { selectAll, selectEntities } = storeAdapter.getSelectors();
export const getStoreState = (rootState) => rootState[STORE_FEATURE_KEY];
export const selectAllStore = createSelector(getStoreState, selectAll);
export const selectStoreEntities = createSelector(
  getStoreState,
  selectEntities,
);
