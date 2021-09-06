const {ApolloServer,gql}=require("apollo-server");
const {RESTDataSource } = require("apollo-datasource-rest");

class Track extends RESTDataSource{
    constructor()
    {
        super();
        this.baseURL="http://localhost:8080/getUsers";
    }
   async getStudents()
    {
        const {students} = await this.get("");
        console.log(typeof students);
        return students;
    }
}

const typeDefs = gql`
    type Student{
        name: String
    }
    type Query{
        studentDetails: [Student!]!
    }
`;
const resolvers = {
    Query:{
    studentDetails:(_,__,{dataSources})=>{
        return dataSources.Tracker.getStudents();
    }
}
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources:()=>
    ({   
        Tracker:new Track()
    })
});
server.listen().then(({url})=>{
    console.log(`server ready at ${url}`);
});