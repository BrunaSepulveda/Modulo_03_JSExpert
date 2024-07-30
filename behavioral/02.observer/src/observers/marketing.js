export default class Marketing {
  update({ id, userName }) {
    console.log(
      `[${id}]: [marketing] will pack the user's order to [${userName}]`,
    );
  }
}
