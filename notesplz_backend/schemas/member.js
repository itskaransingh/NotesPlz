export default {
    type:'document',
    name:'member',
    title:'Member',
    fields:[
        {
            type:'user',
            name:'user',
            title:'Member'
        },
        {
          type:'boolean',
          name:'isadmin',
          Title:'Is Admin',
          initialValue:false
        },
        {
            type:'string',
            name:'userid',
            Title:'User Id',
        },
        {
            type:'string',
            name:'paw',
            Title:'Portal Associated With',
        }
        ]
}