export default {
    type:'document',
    name:'field',
    title:'Field',
    fields:[
        {
           type:'string',
           name:'title',
           title:'Title'
        },
         {
            type:'string',
            name:'pid',
            title:'Parent Id'
         },
         {
            type:'array',
            name:'docoff',
            title:'Docs',
            of:[{type:'docked'}]
         },
         {
            type:'boolean',
            name:'ffield',
            title:'file field',
            initialValue:false
         }
    ]}