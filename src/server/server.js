import { Server, Model } from "miragejs"

export function makeServer({ environment = "development" } = {}) {
  let server = new Server({
    environment,

    models: {
      user: Model,
    },

    seeds(server) {
      server.create("user", { name: "Bob", year: 1999 })
      server.create("user", { name: "Alice", year: 1998 })
      server.create("user", { name: "Luke", year: 2010 })
      server.create("user", { name: "Leia", year: 2014 })
      server.create("user", { name: "Anakin", year: 2017 })
    },

    routes() {
      this.namespace = "api"

      this.get("/users", schema => {
        return schema.users.all()
      });

      this.get('/users/:id', (schema, request) => {
        return schema.users.find(request.params.id);
      });

      this.post("/users", (schema, request) => {
        let users = JSON.parse(request.requestBody)
        return schema.users.create(users)
      });

      this.put("/users/:id", (schema, request) => {
        let id = request.params.id
        let user = schema.users.find(id)
        return user.update(JSON.parse(request.requestBody))
      });

      this.delete("/users/:id", (schema, request) => {
        let id = request.params.id
        return schema.users.find(id).destroy()
      });
    },
  })

  return server
}
