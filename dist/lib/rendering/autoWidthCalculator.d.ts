// Type definitions for ag-grid v4.1.3
// Project: http://www.ag-grid.com/
// Definitions by: Niall Crosby <https://github.com/ceolter/>
// Definitions: https://github.com/borisyankov/DefinitelyTyped
import { Column } from "../entities/column";
export declare class AutoWidthCalculator {
    private rowRenderer;
    private gridPanel;
    private headerRenderer;
    private enterprise;
    getPreferredWidthForColumn(column: Column): number;
    private getPreferredWidth(eContainer, eOriginalCells);
    private getCloneParent(eCell);
}
