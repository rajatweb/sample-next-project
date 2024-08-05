import { ITeamPerson, IUserInfoDropdown } from "@/utils/commonTypes";
import { createServer, Model } from "miragejs"
import { getContent, getPosts, getStreamsPosts, getTeams, getUser } from "./faker";

export function makeServer({ environment = "test" } = {}) {
  let server = createServer({
    environment,

    models: {
      socialUser:Model.extend<Partial<IUserInfoDropdown>>({}),
      teamUsers:Model.extend<Partial<ITeamPerson & {id:number}>>({})
    },

    seeds(server) {
    //   server.create("user", { name: "Bob" })
    //   server.create("user", { name: "Alice" })
    },

    routes() {
      this.namespace = "api";
      this.timing = 2000;
      this.get("/socialUsers", (schema) => {
        return schema.all('socialUser')
      })
      this.post("/socialUser", (schema, request) => {
        let attrs = JSON.parse(request.requestBody);
       return schema.create("socialUser", attrs);
      })
      this.get("/posts", (schema,request) => {

        const fromDate = request.queryParams?.fromDate as string;
        const endDate = request.queryParams.lastDate as string;
        return getPosts(fromDate,endDate);
      })

      this.get("/content", (schema,request) => {

        const id = request.queryParams?.id as string;
        return getContent(id);
      });

      this.get("/user", (schema,request) => {

        const id = request.queryParams?.id as string;
        return getUser(id);
      }),
      this.get("/teams",(schema,request)=>{

        return getTeams();
      }),
      this.get("/team-users",(schema)=>{
        return schema.all('teamUsers');
      }),
      this.post("/team-users", (schema, request) => {
        let attrs = JSON.parse(request.requestBody);
        console.log(attrs);
        attrs.id = Date.now();
       return schema.create("teamUsers", attrs);
      }),
      this.get("/user-streams",(schema,request) => {
        const fromDate = request.queryParams?.fromDate as string;
        const endDate = request.queryParams.lastDate as string;
        return getStreamsPosts(fromDate,endDate);
      })
    },
  })

  return server
}