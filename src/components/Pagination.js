import React, {useState} from 'react';
import {Pagination as BootstrapPagination} from 'react-bootstrap';

const Pagination = ({customStyles, onSelectedPageChange, itemsQty, itemsPerPage, ...rest}) => {
        const styles = {
            container: (provided, state) => ({
                ...provided,
                ...customStyles.container
            }),
            ...customStyles
        };

        const [selectedPage, setSelectedPage] = useState(1);
        const defaultItemsPerPage = 10;
        const pages = [];
        const maxPagesToShow = 10;
        itemsPerPage = (!!itemsPerPage && itemsPerPage) || defaultItemsPerPage;

        const onPageChange = (selectedPage) => {
            setSelectedPage(selectedPage);

            if (!!onSelectedPageChange) {
                onSelectedPageChange(selectedPage);
            }
        };

        const totalPages = Math.ceil(itemsQty / itemsPerPage);
        const ellipsisThreshold = maxPagesToShow/2;
        let leftOffset = (selectedPage > ellipsisThreshold)? selectedPage-ellipsisThreshold : 0;
        const showRightEllipsis = (selectedPage < (totalPages - ellipsisThreshold));

        if(!showRightEllipsis){
            const distanceToThreshold = selectedPage - (totalPages - ellipsisThreshold);
            leftOffset -= distanceToThreshold;
        }

        if (leftOffset > 0) {pages.push(<BootstrapPagination.Ellipsis/>)}

        for (let i = leftOffset + 1;
             i <= totalPages && i <= leftOffset + maxPagesToShow +1; i++) {
            pages.push(
                <BootstrapPagination.Item onClick={() => onPageChange(i)}
                                          key={i}
                                          active={i === selectedPage}>
                    {i}
                </BootstrapPagination.Item>
            );
        }

        if (showRightEllipsis) {pages.push(<BootstrapPagination.Ellipsis/>)}

        return (
            <BootstrapPagination styles={styles} {...rest}>
                {totalPages > 0 &&
                <React.Fragment>
                    <BootstrapPagination.First onClick={() => onPageChange(1)}/>
                    {pages}
                    <BootstrapPagination.Last onClick={() => onPageChange(totalPages)}/>
                </React.Fragment>
                }
            </BootstrapPagination>
        )
    }
;

export default Pagination
