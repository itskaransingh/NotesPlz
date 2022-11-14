export default {
  type: "document",
  name: "users",
  title: "Users",
  fields: [
    {
      type: "string",
      name: "fname",
      title: "First Name",
    },
    {
      type: "string",
      name: "lname",
      title: "Last Name",
    },
    {
      type: "string",
      name: "username",
      title: "UserName",
    },
    {
      type: "string",
      name: "password",
      title: "Password",
    },
    {
      type:'boolean',
      name:'isadmin',
      title:'isadmin',
      initialValue:false
   }
  ],
};
