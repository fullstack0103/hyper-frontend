import styled, { css } from 'styled-components'

export const CardItemContainer = styled.div`
  position: relative;
  border-radius: 20px;
  width: 100%;
  text-align: left;
  display: -moz-box;
  display: flex;
  background: #efefef4d;
  -webkit-transition: all .2s;
  transition: all .2s;
  max-width: 388px;
  border: 2px solid #A3FF12;

  &:hover {
    background: -webkit-linear-gradient(0deg,#eeb200,#00c0f5 98.27%);
    animation: gradient 2s ease infinite;

    .multiple-tile-1 {
      &::after {
        background: -webkit-linear-gradient(0deg,#eeb200,#00c0f5 98.27%);
      }
    }

    .multiple-tile-2 {
      &::after {
        background: -webkit-linear-gradient(0deg,#eeb200,#00c0f5 98.27%);
      }
    }

    .card-footer {
      .footer-logos-wrapper {
        display: none;
      }
      .footer-sale-type {
        display: block;
      }
    }
  }

  @media (max-width: 1440px) {
    max-width: 388px;
  }

  .card-content {
    margin: 1px;
    background: #222430;
    border-radius: 20px;
    padding: 12px 0;
    height: -webkit-calc(100% - 2px);
    height: calc(100% - 2px);
    display: -moz-box;
    display: flex;
    -moz-box-orient: vertical;
    -moz-box-direction: normal;
    flex-direction: column;
    width: 100%;
  }

  .card-header {
    padding: 0 13px;

    .nft-title {
      color: #A3FF20;
      text-align: center;
      font-weight: 800;
      font-size: 18px;
    }
  }

  .card-media {
    height: 100%;
    max-height: 230px;
    cursor: pointer;
    padding: 3px;
  }

  .card-video-container {
    position: relative;
    display: flex;
    height: 100%;
    justify-content: center;
    padding: 0 13px;
  }
  
  .card-image-container {
    position: relative;
    display: flex;
    height: 100%;
    justify-content: center;
    padding: 0 13px;

    span {
      width: 100%;
    }
    
    img {
      width: 100%;
      height: 230px;
      object-fit: contain;
    }
  }

  .card-video {
    width: 100%;
    height: 230px;
    object-fit: cover;
  }

  .card-video-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
     
    &:hover {
      img {
        display: none;
      }
    }
  }

  .card-title{
    font-style: normal;
    font-weight: 700;
    margin-top: 16px;
    font-size: 20px;
    line-height: 28px;
    letter-spacing: 0;
    cursor: pointer;
    color: #efefef;
    white-space: pre-wrap;
  }

  .card-artist {
    margin-top: 8px;
    line-height: 18px;
    font-size: 12px;
    color: grey;
    display: flex;
    align-items: center;
    justify-content: space-between;
    white-space: pre-wrap;
  }

  .card-details {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 13px;
  }

  .card-action-detail {
    display: flex;
    flex-direction: column;
    color: #FFF;
    font-weight: 600;
    font-size: 14px;
    text-transform: uppercase;
  }

  .card-price-detail {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    font-style: normal;
    font-weight: 500;
    font-size: 10px;
    line-height: 13px;
    color: #FFFFFF;
    white-space: pre-wrap;

    .price {
      text-align: right;
      font-weight: 500;
    }

    .card-price-type {
      display: flex;
      align-items: center;

      >img {
        width: 10px;
        height: 10px;
      }

      >span {
        font-style: normal;
        font-weight: 500;
        font-size: 10px;
        line-height: 13px;
        color: #FFFFFF;
      }
    }

    .card-price-value {
      text-align: right;
      line-height: 18px;
    }
  }

  .card-multiple {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    padding: 0 10px;
  }

  .multiple-tile-1 {
    position: relative;
    overflow: hidden;
    height: 3px;

    &::before {
      content: "";
      display: block;
      height: 19px;
      background: #fff;
      border-radius: 4px;
      width: calc(100% - 2px);
      position: absolute;
      bottom: 1px;    
      left: 1px;
      z-index: 1;
      background-color: #000;
    }

    &::after {
      content: "";
      display: block;
      height: 20px;
      border-radius: 5px;
      background: #efefef4d;
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
    }
  }

  .multiple-tile-2 {
    position: relative;
    overflow: hidden;
    height: 4px;

    &::before {
      content: "";
      display: block;
      height: 19px;
      background: #fff;
      border-radius: 4px;
      position: absolute;
      bottom: 1px;
      z-index: 1;
      background-color: #000;
      left: 11px;
      width: calc(100% - 22px);
      bottom: 2px;
    }

    &::after {
      content: "";
      display: block;
      height: 20px;
      border-radius: 5px;
      background: #efefef4d;
      position: absolute;
      width: calc(100% - 20px);
      bottom: 1px;
      left: 10px;
    }
  }

  .card-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 13px;
    height: 25px;

    .footer-logos-wrapper {
      display: flex;
      align-items: center;
    }

    .footer-sale-type {
      display: none;
      span {
        color: #A3FF12;
        font-weight: 800;
      }
    }

    .card-favorite, .card-message {
      display: flex;
      align-items: center;

      .icon {
        cursor: pointer;
        display: flex;
        >svg {
          width: 14px;
          height: 14px;
          color: #A3FF12;
        }
      }


      >span {
        font-style: normal;
        font-weight: normal;
        font-size: 12px;
        line-height: 15px;
        color: #FFFFFF;
        margin-left: 4px;
      }
    }
  }
`;

export const CardAvatar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;

  > svg {
    width: 20px;
    height: 20px;
  }

  img {
    width: 24px;
    height: 24px;
    border-radius: 50%;
  }

  .sale-copy {
    flex: 1 0 auto;
    color: #A3FF12;
    font-weight: 600;
    text-align: right;
    margin: 0px 10px;
  }

  .sale-type {
    background: rgba(163,255,18,0.2);
    padding: 4px 8px;
    border-radius: 16px;
    font-weight: 800;
  }

  .sale-buy {
    color: #A3FF12;
  }

  .sale-bid {
    color: white;
  }

  .sale-offer {
    color: #12FFA3;
  }

  ${({ isSkeleton }) => isSkeleton && css`
    span {
      border-radius: 50%;
    }
  `}
`;