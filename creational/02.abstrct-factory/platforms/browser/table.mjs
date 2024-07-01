import TableComponent from '../../shared/base/tableComponent.mjs';

export default class TableBrowserComponent extends TableComponent {
  render(data) {
    const template = this.prepareData(data);

    document.body.insertAdjacentHTML("afterBegin", template)
  }

  prepareData(data) {
    const [firstItem] = data;

    const joinList = (list) => list.join('');

    const tHeaders = joinList(Object.keys(firstItem).map(
      (text) => `<th scope=col>${text}</th>`,
    ));

    const tBody = joinList(data.map((item) => {
      const values = Object.values(item);
      const tdEls = joinList(values.map((val) => `<td>${val}</td>`));
      return `<tr>${tdEls}</tr>`;
    }));

    const template = `
    <table class="table">
      <thead>
        <tr>${tHeaders}</tr>
      </thead>
      <tbody>${tBody}</tbody>
    </table>`;

    return template;
  }
}
