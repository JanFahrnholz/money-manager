import { FC, useState } from "react";
import { InfiniteLoader, List } from "react-virtualized";

interface Props {
    hasNextPage: boolean;
    isNextPageLoading: boolean;
    list: any[];
    loadNextPage: Promise<any[]>;
}

const LoadingList: FC<Props> = ({
    hasNextPage,
    isNextPageLoading,
    list,
    loadNextPage,
}) => {
    // If there are more items to be loaded then add an extra row to hold a loading indicator.
    const rowCount = hasNextPage ? list.length + 1 : list.length;

    // Only load 1 page of items at a time.
    // Pass an empty callback to InfiniteLoader in case it asks us to load more than once.
    const loadMoreRows = isNextPageLoading ? () => {} : loadNextPage;

    // Every row is loaded except for our loading indicator row.
    const isRowLoaded = ({ index }) => !hasNextPage || index < list.length;

    // Render a list item or a loading indicator.
    const rowRenderer = ({ index, key, style }) => {
        let content;

        if (!isRowLoaded({ index })) {
            content = "Loading...";
        } else {
            content = list.getIn([index, "name"]);
        }

        return (
            <div key={key} style={style}>
                {content}
            </div>
        );
    };

    return (
        <InfiniteLoader
            isRowLoaded={isRowLoaded}
            loadMoreRows={loadMoreRows}
            rowCount={rowCount}
        >
            {({ onRowsRendered, registerChild }) => (
                <List
                    ref={registerChild}
                    onRowsRendered={onRowsRendered}
                    rowRenderer={rowRenderer}
                />
            )}
        </InfiniteLoader>
    );
};

export default LoadingList;
