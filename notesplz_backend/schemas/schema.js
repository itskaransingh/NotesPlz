// First, we must import the schema creator
import createSchema from "part:@sanity/base/schema-creator";
import users from "./users";
import createdby from "./createdby";
import portals from "./portals";
import member from "./member";
import user from "./user";
// import content from "./content";

// Then import schema types from any plugins that might expose them
import schemaTypes from "all:part:@sanity/base/schema-type";
import field from "./field";
import docs from "./docs";
import document from "./document";

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: "default",
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([users, portals, createdby,docs, member,document, user, field]),
});
