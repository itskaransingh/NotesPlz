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
            name:'fieldid',
            title:'Field Id'
         },
         {
            type:'array',
            name:'subfields',
            Title:'Subfields',
            of:[{type:'field'}],
         },
         {
            type:'array',
            name:'file',
            Title:'Files',
            of:[{type:'content'}]
         }
    ]}