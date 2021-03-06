import Url from "url-parse";
/*
        var urlParams = new URLSearchParams(window.location.search);
        params.values = {};
        [
          "firstname",
          "lastname",
          "email",
          "postcode",
          "country",
          "comment"
        ].forEach(function(name) {
          if (urlParams.get(name)) params.values[name] = urlParams.get(name);
        });
        */

const filter = (query, whitelist = null, prefix = "") => {
  if (!whitelist) return query;
  let r = {};
  Object.keys(query)
    .filter(
      key =>
        key.startsWith(prefix) && whitelist.includes(key.substr(prefix.length))
    )
    .forEach(k => (r[k.substr(prefix.length)] = query[k]));
  return r;
};

const parse = (whitelist,prefix) => {
  const url = Url(document.location, true);
  return filter(url.query,whitelist,prefix) || {};
};

const data = prefix => {
  prefix = prefix || "proca_";
  const whitelist = [
    "firstname",
    "lastname",
    "name",
    "email",
    "postcode",
    "address",
    "locality",
    "country",
    "comment"
  ];
  return parse( whitelist, prefix);
};

const config = prefix => {
  prefix = prefix || "proca_";
  const whitelist = [
    "comment"
  ];
  return parse( whitelist, prefix);
};

const utm = () => {
  const whitelist = ["source", "medium", "campaign", "content"];
  const utm= parse( whitelist, "utm_");
  if ( 0 === Object.keys(utm).length && document.referrer) {
    utm.medium= "website";
    utm.source= "referrer";
    utm.campaign= document.referrer;
  }
  return utm;
};

export { utm, data, config };
export default {utm:utm, data:data, config:config};
