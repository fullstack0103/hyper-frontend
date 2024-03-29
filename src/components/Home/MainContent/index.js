import React, { useCallback, useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import CardItem from "../../Shared/CardItem";
import { useWindowSize } from "../../../hooks/useWindowSize";
import GradientButton from "../../Shared/GradientButton";
import { MainContentContainer, CardList, FilterWrapper } from "./styles";

const PIXELS_TO_SCROLL = 100;

export const MainContent = (props) => {
  const {
    isOpenRightMenu,
    isMoreView,
    isLoading,
    sales,
    nfts,
    selectedFilterItem,
    setSelectedFilterItem
  } = props;

  console.log('++++ sales', sales);
  console.log('++++ nfts', nfts);

  const windowSize = useWindowSize();
  let navigate = useNavigate();

  const itemsRef = useRef(null);
  const [loadedSales, setLoadedSales] = useState([]);
  const [isLoadMore, setIsLoadMore] = useState(false);

  const filterList = [
    { key: "all", name: "All" },
    { key: "listed", name: "Listed" },
    { key: "unlisted", name: "Unlisted" },
  ];

  const handleDetails = (sale) => {
    if (sale.method === 2) {
      navigate(`/products/${sale.collectionAddress}/${sale.tokenId}/offer`);
    } else {
      let tt = loadedSales.filter((t) => t.saleId === sale.saleId);
      if (tt.length > 0) {
        switch (tt[0].method) {
          case 0:
            navigate(
              `/products/${tt[0].collectionAddress}/${tt[0].tokenId}/${sale.saleId}/buy`
            );
            break;
          case 1:
            navigate(
              `/products/${tt[0].collectionAddress}/${tt[0].tokenId}/${sale.saleId}/bid`
            );
            break;
          default:
            break;
        }
      }
    }
  };

  const handleLoadMoreItems = useCallback(
    (startPos) => {
      if (startPos < sales.length) {
        setIsLoadMore(true);

        let maxCount = sales.length - startPos;
        if (maxCount > 15) maxCount = 15;

        setTimeout(() => {
          setLoadedSales((t) => [
            ...t.slice(0, startPos),
            ...sales.slice(startPos, startPos + maxCount),
          ]);
          setIsLoadMore(false);
        }, 1000);
      }
    },
    [loadedSales, sales]
  );

  const handleScroll = useCallback(() => {
    if (isLoadMore) return;

    const innerHeightScrolltop =
      itemsRef?.current.offsetHeight +
      itemsRef?.current.scrollTop +
      PIXELS_TO_SCROLL;
    if (loadedSales.length < sales.length) {
      if (itemsRef?.current.scrollHeight < innerHeightScrolltop) {
        handleLoadMoreItems(loadedSales.length);
      }
    }
  }, [isLoadMore, loadedSales, sales]);

  useEffect(() => {
    itemsRef?.current?.addEventListener("scroll", handleScroll);
    return () => {
      itemsRef?.current?.removeEventListener("scroll", handleScroll);
    };
  }, [isLoadMore, loadedSales, sales]);

  useEffect(() => {
    if (isLoading !== true) {
      setLoadedSales((t) => []);
      handleLoadMoreItems(0);
    }
  }, [sales, isLoading]);

  return (
    <MainContentContainer
      ref={itemsRef}
      style={
        windowSize.width < 800 && isOpenRightMenu
          ? { display: "none" }
          : { display: "block" }
      }
    >
      {(sales.length > 0 || nfts?.length > 0) ? (
        <>
          <FilterWrapper>
            {filterList.map((item) => (
              <GradientButton
                key={item.key}
                isNoPadding
                width="100px"
                height="40px"
                label={item.name}
                isBlackMode={selectedFilterItem !== item.key}
                isDarkMode={selectedFilterItem !== item.key}
                handleClick={() => setSelectedFilterItem(item.key)}
              />
            ))}
          </FilterWrapper>
          <CardList isMoreView={isMoreView}>
            {isLoading ? (
              [...Array(15).keys()].map((i) => <CardItem key={i} isSkeleton />)
            ) : (
              <>
                {selectedFilterItem !== 'all' ? (
                  loadedSales.map((item, index) => {
                    let tt = nfts.filter(
                      (t) =>
                        t.collectionAddress.toLowerCase() ===
                          item.collectionAddress.toLowerCase() &&
                        t.tokenId === item.tokenId
                    );
                    return tt.length > 0 ? (
                      <CardItem
                        key={index}
                        item={tt[0]}
                        sale={item}
                        onClick={() => handleDetails(item)}
                      />
                    ) : (
                      <></>
                    );
                  })
                ) : (
                  nfts.map((nft, index) => (
                    <CardItem
                      key={index}
                      item={nft}
                      // sale={nft}
                      // onClick={() => handleDetails(nft)}
                    />
                  ))
                )}
                {isLoadMore &&
                  [...Array(15).keys()].map((i) => (
                    <CardItem key={i} isSkeleton />
                  ))}
              </>
            )}
          </CardList>
        </>
      ) : (
        <div className="no-result">No Result!</div>
      )}
    </MainContentContainer>
  );
};
