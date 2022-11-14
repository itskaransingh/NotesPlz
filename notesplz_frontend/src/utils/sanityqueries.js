//?create as a function there is gonna be more channels

import { json } from "react-router-dom";

export const portalQuery = (poid) => {
  const query = `*[_type == 'portals' && _id == '${poid}' ]`;
  return query;
};

export const unauthQuery = (un) => {
  const query = `*[_type == 'users' && username match '${un}']`;
  return query;
};

export const loginQuery = (un, pass) => {
  const query = `*[_type == 'users' && username == '${un}' && password == '${pass}' ]`;
  return query;
};

export const pawQuery = (id) => {
  const query = `*[_type == 'portals' && createdby._ref == '${id}'  ]`;
  return query;
};

export const docQuery = (id, portalid) => {
  const query = `*[_type == 'doc' && pid == '${id}' && paw == '${portalid}'] | order(_createdAt desc){
        _id,
        _key,
        title,
        caption,
        file{
            asset->{url,_id},
        },
        image{
            asset->{url,_id},
        },
    }`;
  return query;
};

export const landingQuery = (portalid) => {
  const query = `*[_type == 'doc' && paw == '${portalid}'] | order(_createdAt desc){
        _key,
        title,
        caption,
        file{
            asset->{url},
        },
        image{
            asset->{url},
        },
    }[0...4]`;
  return query;
};

export const adminQuery = (id) => {
  const query = `*[_type == 'users' && _id == '${id}']{
    fname,lname,username,_id
  }`;
  return query;
};

// export const controlsauthQuery = (id) => {
//   const query = `*[_type == 'portals' && _id == '${id}']{
//     admins[]{
//       user
//     }
//   }`;
//   return query;
// };

export const userls = () =>
  localStorage.getItem("user") !== undefined
    ? JSON.parse(localStorage.getItem("user"))
    : localStorage.clear();
