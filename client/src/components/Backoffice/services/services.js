import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import NewService from './newService';
import EditService from './editService';
import * as action from '../../../actions/backoffice/creators';

export default function ServicesBO() {
  const services = useSelector((state) => state.serviceBOReducer.services);
  const authAlert = useSelector((store) => store.authReducers.authAlert);
  const dispatch = useDispatch();

  useEffect(() => {
    action.getServices(dispatch);
  }, []);

  return (
    <div>
      <div className="card ">
        <div className="card-header">
          <div className="d-flex justify-content-around">
            <h3>Service</h3>
            <NewService />
          </div>
        </div>
        <div className="card-body">
          <div className="row">
            {services &&
              services.map((s) => (
                <div className="col-12 col-sm-6 col-md-4 d-flex align-items-stretch flex-column ">
                  <div className="card bg-light d-flex ">
                    <div className="card-header border-bottom-0">Service ID : {s.id}</div>
                    <div className="card-body pt-0">
                      <div className="row">
                        <div>
                          <h2 className="lead ">
                            <b>{s.name}</b>
                          </h2>
                          <hr />
                          <p className="text-muted ">
                            <b>Description: </b>
                            {s.description}
                            <br />
                            <b>Price: </b>$ {s.price}
                            <br />
                            <b>Categories: </b>
                            {s.categories.map((c) => (
                              <>
                                <span>• {c.name} </span>
                              </>
                            ))}
                            •
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="card-footer d-flex flex-row-reverse">
                      <EditService
                        categories={s.categories}
                        name={s.name}
                        price={s.price}
                        description={s.description}
                      />
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
