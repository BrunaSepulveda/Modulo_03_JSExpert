import TableComponent from '../../shared/base/tableComponent.mjs';
import chalk from 'chalk';
import chalkTable from 'chalk-table';

export default class TableConsoleComponent extends TableComponent {
  render(data) {
    const columns = this.prepareData(data);

    const options = {
      leftpad: 2,
      columns
    }

    const table = chalkTable(options,data);
    console.log(table)
  }

  prepareData(data) {
    const formatHead = (item, index) =>
      index % 2 === 0 ? chalk.yellow(item) : chalk.green(item);

    const [firstItem] = data;

    const columns = Object.keys(firstItem).map((item, index) => ({
      field: item,
      name: formatHead(item,index),
    }));

    return columns;
  }
}
