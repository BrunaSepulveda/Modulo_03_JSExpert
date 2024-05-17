class Database {
  constructor({ connectionString }){
    this.connectionString = connectionString;
  }

  async sleep(ms){
    return new Promise(resolve => {
      setTimeout(resolve, ms)
    })
  }

  async connection(){
    await this.sleep(1000)
    return this;
  }

  async find(query){
    await this.sleep(1000)
    return [{ name: 'Bruna' }]
  }
}

module.exports = Database;