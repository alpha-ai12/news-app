import React from "react";
import ReactFlagsSelect from "react-flags-select";
import Skeleton from "react-loading-skeleton";
import { View } from "react-native";
import "react-loading-skeleton/dist/skeleton.css";

interface FlagType {
  code: string;
  setCode: any;
}
export const FlagElement = (props: FlagType) => {
  const { code, setCode } = props;

  return (
    <View
      style={[
        {
          marginLeft: 7,
          marginTop: 3,
          width: 72,
        },
        code === "" && { overflow: "hidden" },
      ]}
    >
      {code !== "" ? (
        <ReactFlagsSelect
          selected={code.toUpperCase()}
          onSelect={(c) => {
            setCode(c.toLowerCase());
          }}
          showSelectedLabel={false}
          searchable
          fullWidth={false}
          alignOptionsToRight
          // selectedSize={20}
          selectedSize={14}
          countries={[
            "AS",
            "AD",
            "AI",
            "AG",
            "AM",
            "AW",
            "BS",
            "BZ",
            "BJ",
            "BW",
            "IO",
            "BI",
            "CF",
            "TD",
            "CG",
            "CK",
            "CW",
            "GQ",
            "ER",
            "FK",
            "FO",
            "GM",
            "GI",
            "GL",
            "GD",
            "GU",
            "GG",
            "GW",
            "IR",
            "IM",
            "JE",
            "KI",
            "LA",
            "LS",
            "LR",
            "LI",
            "MH",
            "MQ",
            "MU",
            "FM",
            "MC",
            "MS",
            "NR",
            "NI",
            "NU",
            "NF",
            "MP",
            "PW",
            "PS",
            "PG",
            "PN",
            "QA",
            "KN",
            "LC",
            "ST",
            "SC",
            "SL",
            "SX",
            "SS",
            "SR",
            "SZ",
            "TG",
            "TK",
            "TT",
            "TC",
            "TV",
            "VU",
            "VN",
            "BN",
            "AL",
            "DZ",
            "AT",
            "AZ",
            "BH",
            "BD",
            "BY",
            "BE",
            "BO",
            "BA",
            "BF",
            "KH",
            "CM",
            "CV",
            "KY",
            "CL",
            "CO",
            "KM",
            "CD",
            "CI",
            "HR",
            "CZ",
            "DK",
            "DJ",
            "DM",
            "EC",
            "EG",
            "SV",
            "EE",
            "PF",
            "GT",
            "GN",
            "HT",
            "HN",
            "HK",
            "IS",
            "ID",
            "IQ",
            "JO",
            "KZ",
            "KP",
            "KW",
            "LV",
            "LY",
            "LU",
            "MG",
            "MV",
            "ML",
            "MR",
            "MX",
            "MN",
            "ME",
            "MA",
            "MZ",
            "NE",
            "NO",
            "PA",
            "PY",
            "PE",
            "PL",
            "PR",
            "MK",
            "MD",
            "RW",
            "WS",
            "SN",
            "RS",
            "SI",
            "SY",
            "TW",
            "TO",
            "TN",
            "UA",
            "UY",
            "UZ",
            "VI",
            "YE",
          ]}
          blacklistCountries
        />
      ) : (
        <Skeleton width={72} height={38} />
      )}
    </View>
  );
};
