import { useLayoutEffect, useRef, useState, memo } from "react"
import { v4 as uuidv4 } from "uuid"
import PageLink from "./PageLink"

interface PaginationProps {
  pageNumbers: number
  currentPage: number
  label: string
  onPageChange: (newPage: number) => void
}

const maxMiniPaging = 3
const maxNormalPaging = 10

const Pagination = ({ pageNumbers, currentPage, label, onPageChange }: PaginationProps) => {
  const firstUpdate = useRef(true)
  const [currentPagedValue, setCurrentPagedValue] = useState(currentPage)

  const handlePageChange = (newPageNumber: number) => {
    setCurrentPagedValue(newPageNumber)
    return false
  }

  const handleNextLinkPageChange = () => {
    let newPage: number = currentPagedValue + 1
    if (newPage > pageNumbers) {
      newPage = pageNumbers
    }
    setCurrentPagedValue(newPage)
    return false
  }

  const handlePrevLinkPageChange = () => {
    let newPage: number = currentPagedValue - 1
    if (newPage < 1) {
      newPage = 1
    }
    setCurrentPagedValue(newPage)
    return false
  }

  useLayoutEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false
      return
    }
    onPageChange(currentPagedValue)
  }, [currentPagedValue])

  const generateBlock = (block: number, selectedBlock: number): React.ReactNode => {
    const blockAttr = {
      className:
        block === selectedBlock
          ? "govuk-pagination__item govuk-pagination__item--current"
          : "govuk-pagination__item"
    }
    return (
      <li {...blockAttr} key={uuidv4()}>
        <PageLink assistiveText={`Page ${block}`} onClick={() => handlePageChange(block)}>
          {block}
        </PageLink>
      </li>
    )
  }

  const generatePagingElipse = () => {
    return (
      <li
        className="govuk-pagination__item govuk-pagination__item--ellipses"
        aria-hidden="true"
        key={uuidv4()}>
        ...
      </li>
    )
  }

  const generatePagingBlocks = (blocks: number, currentBlock: number): React.ReactNode[] => {
    const pagingBlocks: React.ReactNode[] = []
    for (let i = 1; i <= blocks; i += 1) {
      pagingBlocks.push(generateBlock(i, currentBlock))
    }
    return pagingBlocks
  }

  const generateLargePagingBlocks = (blocks: number, currentBlock: number): React.ReactNode[] => {
    const pagingBlocks: React.ReactNode[] = []

    if (currentBlock < 4) {
      pagingBlocks.push(generateBlock(1, currentBlock))
      pagingBlocks.push(generatePagingElipse())
      for (let i = 2; i <= 4; i += 1) {
        pagingBlocks.push(generateBlock(i, currentBlock))
      }
      pagingBlocks.push(generatePagingElipse())
      pagingBlocks.push(generateBlock(blocks, currentBlock))
    }

    if (currentBlock >= 4 && currentBlock < blocks - 1) {
      pagingBlocks.push(generateBlock(1, currentBlock))
      pagingBlocks.push(generatePagingElipse())
      for (let i = currentBlock - 1; i <= currentBlock + 1; i += 1) {
        pagingBlocks.push(generateBlock(i, currentBlock))
      }
      pagingBlocks.push(generatePagingElipse())
      pagingBlocks.push(generateBlock(blocks, currentBlock))
    }

    if (currentBlock >= blocks - 1 && currentBlock) {
      pagingBlocks.push(generateBlock(1, currentBlock))
      pagingBlocks.push(generatePagingElipse())
      for (let i = blocks - 3; i <= blocks - 1; i += 1) {
        pagingBlocks.push(generateBlock(i, currentBlock))
      }
      pagingBlocks.push(generatePagingElipse())
      pagingBlocks.push(generateBlock(blocks, currentBlock))
    }

    return pagingBlocks
  }

  const generatePaging = (): React.ReactNode => {
    if (pageNumbers > maxMiniPaging) {
      if (pageNumbers > maxNormalPaging) {
        return (
          <ul className="govuk-pagination__list" key={uuidv4()}>
            {generateLargePagingBlocks(pageNumbers, currentPagedValue)}
          </ul>
        )
      }
      return (
        <ul className="govuk-pagination__list" key={uuidv4()}>
          {generatePagingBlocks(pageNumbers, currentPagedValue)}
        </ul>
      )
    }
    return <></>
  }

  function GetPrevLink(): React.ReactNode {
    if (currentPagedValue > 1) {
      if (pageNumbers > maxMiniPaging) {
        return (
          <div className="govuk-pagination__prev" key={uuidv4()}>
            <PageLink rel="prev" onClick={() => handlePrevLinkPageChange()}>
              <>
                <svg
                  className="govuk-pagination__icon govuk-pagination__icon--prev"
                  xmlns="http://www.w3.org/2000/svg"
                  height="13"
                  width="15"
                  aria-hidden="true"
                  focusable="false"
                  viewBox="0 0 15 13">
                  <path d="m6.5938-0.0078125-6.7266 6.7266 6.7441 6.4062 1.377-1.449-4.1856-3.9768h12.896v-2h-12.984l4.2931-4.293-1.414-1.414z" />
                </svg>
                <span className="govuk-pagination__link-title">Previous</span>
              </>
            </PageLink>
          </div>
        )
      }
      return (
        <div className="govuk-pagination__prev" key={uuidv4()}>
          <PageLink rel="prev" onClick={() => handlePageChange(currentPagedValue - 1)}>
            <>
              <svg
                className="govuk-pagination__icon govuk-pagination__icon--prev"
                xmlns="http://www.w3.org/2000/svg"
                height="13"
                width="15"
                aria-hidden="true"
                focusable="false"
                viewBox="0 0 15 13">
                <path d="m6.5938-0.0078125-6.7266 6.7266 6.7441 6.4062 1.377-1.449-4.1856-3.9768h12.896v-2h-12.984l4.2931-4.293-1.414-1.414z" />
              </svg>
              <span className="govuk-pagination__link-title">Previous</span>
              <span className="govuk-pagination__link-label">{`${
                currentPagedValue - 1
              } of ${pageNumbers}`}</span>
            </>
          </PageLink>
        </div>
      )
    }
    return <></>
  }

  function GetNextLink(): React.ReactNode {
    if (currentPagedValue < pageNumbers) {
      if (pageNumbers > maxMiniPaging) {
        return (
          <div className="govuk-pagination__next" key={uuidv4()}>
            <PageLink rel="next" onClick={() => handleNextLinkPageChange()}>
              <>
                <span className="govuk-pagination__link-title">Next</span>{" "}
                <svg
                  className="govuk-pagination__icon govuk-pagination__icon--next"
                  xmlns="http://www.w3.org/2000/svg"
                  height="13"
                  width="15"
                  aria-hidden="true"
                  focusable="false"
                  viewBox="0 0 15 13">
                  <path d="m8.107-0.0078125-1.4136 1.414 4.2926 4.293h-12.986v2h12.896l-4.1855 3.9766 1.377 1.4492 6.7441-6.4062-6.7246-6.7266z" />
                </svg>
              </>
            </PageLink>
          </div>
        )
      }
      return (
        <div className="govuk-pagination__next" key={uuidv4()}>
          <PageLink rel="next" onClick={() => handlePageChange(currentPagedValue + 1)}>
            <>
              <svg
                className="govuk-pagination__icon govuk-pagination__icon--next"
                xmlns="http://www.w3.org/2000/svg"
                height="13"
                width="15"
                aria-hidden="true"
                focusable="false"
                viewBox="0 0 15 13">
                <path d="m8.107-0.0078125-1.4136 1.414 4.2926 4.293h-12.986v2h12.896l-4.1855 3.9766 1.377 1.4492 6.7441-6.4062-6.7246-6.7266z" />
              </svg>
              <span className="govuk-pagination__link-title">Next</span>
              <span className="govuk-pagination__link-label">{`${
                currentPagedValue + 1
              } of ${pageNumbers}`}</span>
            </>
          </PageLink>
        </div>
      )
    }
    return <></>
  }

  const wrapperAttr = {
    className: "govuk-pagination",
    "aria-label": label
  }
  if (pageNumbers <= maxMiniPaging) {
    wrapperAttr.className += " govuk-pagination--block"
  }

  return (
    <nav {...wrapperAttr} role="navigation" key={uuidv4()}>
      {GetPrevLink()}
      {generatePaging()}
      {GetNextLink()}
    </nav>
  )
}

export default memo(Pagination)
