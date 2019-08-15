import * as classNames from "classnames";
import * as React from "react";
import { SHOW_ACTIVE, SHOW_ALL, SHOW_COMPLETED } from "../constants";


interface IFooterProps {
    completedCount: number;
    activeCount: number;
    filter: string;
    onClearCompleted: ()=>void;
    onShow: (filter:string)=>void;
}

class Footer extends React.Component<IFooterProps> {

render() {
    const { completedCount, activeCount, filter:selectFilter, onClearCompleted, onShow} = this.props;
    return (
            <footer className="footer">
                 <span className="todo-count">{activeCount}item left</span>
                <ul className="filters">
                    {[SHOW_ALL, SHOW_ACTIVE, SHOW_COMPLETED].map(filter=>
                        <li key={filter}>
                            <a className={classNames({selected: filter === selectFilter})}
                               style={{cursor: 'pointer'}}
                               onClick={() => onShow(filter)}>
                                {filter}
                            </a>
                        </li>
                    )}
                </ul>
                {completedCount > 0 &&
                <button className="clear-completed"
                        onClick={() => onClearCompleted()}>
                    Clear completed
                </button>}
            </footer>
        );
    }
}

export default Footer;
