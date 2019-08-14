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
    renderTodoCount() {
        const { activeCount } = this.props;
        const itemWord = activeCount === 1 ? 'item' : 'items';

        return (
            <span className="todo-count">
        <strong>{activeCount || 'No'}</strong> {itemWord} left
      </span>
        );
    }

    renderFilterLink(filter:string) {
        const title : string = filter;
        const { filter: selectedFilter, onShow } = this.props;

        return (
            <a className={classNames({ selected: filter === selectedFilter })}
               style={{ cursor: 'pointer' }}
               onClick={() => onShow(filter)}>
                {title}
            </a>
        );
    }

    renderClearButton():any {
        const { completedCount, onClearCompleted } = this.props;
        if (completedCount > 0) {
            return (
                <button className="clear-completed"
                        onClick={() => onClearCompleted()} >
                    Clear completed
                </button>
            );
        }
    }

    render() {
        return (
            <footer className="footer">
                {this.renderTodoCount()}
                <ul className="filters">
                    {[SHOW_ALL, SHOW_ACTIVE, SHOW_COMPLETED].map(filter =>
                        <li key={filter}>
                            {this.renderFilterLink(filter)}
                        </li>
                    )}
                </ul>
                {this.renderClearButton()}
            </footer>
        );
    }
}

export default Footer;
