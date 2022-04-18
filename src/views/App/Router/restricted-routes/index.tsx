import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import LoadingPage from "src/views/Loading";
import Home from "src/views/_restricted/Home";
import Asset from "src/views/_restricted/Asset";
import AssetEntries from "src/views/_restricted/Asset/AssetEntries";
import Currency from "src/views/_restricted/Currency";
import Porfolio from "src/views/_restricted/Portfolio";
import NotFound from "src/views/NotFound";
import PorfolioDetails from "src/views/_restricted/Portfolio/Details";
import { requestData } from "src/services/setup";

const RestrictedRoutes = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    requestData(dispatch, setIsLoading);
  }, []);

  return isLoading ? (
    <LoadingPage />
  ) : (
    <Routes>
      <React.Fragment>
        <Route path="/" element={<Home />} />
        <Route path="/asset" element={<Asset />} />
        <Route path="/asset/:id" element={<AssetEntries />} />
        <Route path="/currency" element={<Currency />} />
        <Route path="/portfolio" element={<Porfolio />} />
        <Route path="/portfolio/:id" element={<PorfolioDetails />} />
        <Route path="*" element={<NotFound />} />
      </React.Fragment>
    </Routes>
  );
};

export default RestrictedRoutes;
