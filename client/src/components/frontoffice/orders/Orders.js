import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ReactPaginate from 'react-paginate';
import { Popover, OverlayTrigger, Button } from 'react-bootstrap';
import Emptypage from '../../commons/FormDefault/Emptypage';
import * as action from '../../../actions/frontoffice/creators';
import { statusBO, statusColors } from '../../../utils/backoffice/statusBO';

const Orders = () => {
  const orders = useSelector((state) => state.orderReducer.orders);
  const ordersFiltered = orders.filter((o) => o.status !== 'unassigned');
  const [sortDate, setSortDate] = useState('');
  const [sortStatus, setSortStatus] = useState('');
  const [sortPriority, setSortPriority] = useState('');
  const [pageNumber, setPageNumber] = useState(0);
  const orderPerPage = 6;
  const pagesVisited = pageNumber * orderPerPage;
  const pageCount = Math.ceil(ordersFiltered?.length / orderPerPage);

  const dispatch = useDispatch();
  console.log(orders, 'gogo');
  useEffect(() => {
    action.getOrders(dispatch);
  }, [dispatch]);

  useEffect(() => {
    // if (sort !== 'all' && sort !== 'startDate' && sort !== 'lastStartDate') {
    //   return action.sortOrdersStatus(sort, dispatch);
    // }
    if (sortDate === 'startDate') {
      return action.sortOrdersByDate(dispatch);
    }
    if (sortDate === 'lastStartDate') {
      return action.sortOrdersByDateReverse(dispatch);
    }
    return action.getOrders(dispatch);
  }, [sortDate, dispatch]);

  useEffect(() => {
    if (sortStatus !== 'all') {
      return action.sortOrdersStatus(sortStatus, dispatch);
    }
    return action.getOrders / dispatch;
  }, [sortStatus, dispatch]);

  useEffect(() => {
    if (sortPriority === 'high') {
      return action.sortOrdersPriority(dispatch);
    }
    if (sortPriority === 'low') {
      return action.sortOrdersPriorityLow(dispatch);
    }
    return action.getOrders(dispatch);
  }, [sortPriority, dispatch]);
  const popover = (services) => (
    <Popover id="popover-basic">
      <Popover.Title as="h3">Services</Popover.Title>
      <Popover.Content>
        {services?.map((s) => (
          <p>
            <b> • {s.name}</b>
          </p>
        ))}
      </Popover.Content>
    </Popover>
  );

  const Newpopover = (name, phone, email) => (
    <Popover id="popover-basic">
      <Popover.Title as="h3">contact {name}!</Popover.Title>
      <Popover.Content>
        <p>
          Please send me an email to <b>{email}</b> in the chat below or call me to {phone}
        </p>
        <p>
          <b>Thank you!</b>
        </p>
      </Popover.Content>
    </Popover>
  );
  const showServices = (services) => (
    <OverlayTrigger trigger="click" placement="top" overlay={popover(services)}>
      <Button variant="info">See services</Button>
    </OverlayTrigger>
  );

  const showContact = (name, phone, email) => (
    <OverlayTrigger trigger="click" placement="right" overlay={Newpopover(name, phone, email)}>
      <Button variant="success">Contact</Button>
    </OverlayTrigger>
  );

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const displayOrders = ordersFiltered
    ?.slice(pagesVisited, pagesVisited + orderPerPage)
    .map((o) => (
      <div className="col-12 col-sm-6 col-md-4 d-flex align-items-stretch flex-column">
        <div className="card bg-light d-flex flex-fill">
          <div className="card-header text-muted border-bottom-0">
            <h2 className="lead">
              <b>Order n° {o.id}</b>
            </h2>
          </div>
          <div className="card-body pt-0">
            <div className="row">
              <div className="col-7">
                <p className="text-muted text-sm mb-0">
                  Status:
                  <b className={`text-${statusColors[o.status]}`}>{o.status}</b>
                </p>
                <p className="text-muted text-sm mb-0">
                  Priority:{' '}
                  <b>
                    {o.priority ? (
                      <span className="text-success">Success</span>
                    ) : (
                      <span className="text-danger">Low</span>
                    )}
                  </b>
                </p>
                <p className="text-muted text-sm mb-0">
                  Start date: <b>{o.start_date.replace('T', '~').replace('.000Z', ' ')}</b>
                </p>
                <p className="text-muted text-sm mb-0">
                  End date: <b>{o.end_date.replace('T', '~').replace('.000Z', ' ')}</b>
                </p>
                <ul className="ml-4 mb-0 fa-ul text-muted mt-3">
                  <li className="small">
                    <span className="fa-li">
                      <i className="fas fa-lg fa-envelope" />
                    </span>
                    E-mail: <b>{o.assigned_user.email}</b>
                  </li>
                  <li className="small mt-2">
                    <span className="fa-li">
                      <i className="fas fa-lg fa-phone" />
                    </span>
                    Phone: <b>{o.assigned_user.phone}</b>
                  </li>
                </ul>
              </div>
              <div className="col-5 text-center">
                <img
                  src="https://i.ibb.co/VSRq9tP/logo.png"
                  alt="user-avatar"
                  className="img-circle img-fluid"
                  height="50"
                />
                <p>{o.assigned_user.name}</p>
              </div>
            </div>
          </div>
          <div className="card-footer">
            <div className="d-flex justify-content-between">
              {showContact(o.assigned_user.name, o.assigned_user.phone, o.assigned_user.email)}
              {showServices(o.invoice?.services)}
            </div>
          </div>
        </div>
      </div>
    ));

  const ordersUnassigned = orders.filter((o) => o.status === 'unassigned');
  // const handleChange = (e) => {
  //   setSort(e.target.value);
  // };
  return (
    <div>
      <div className="card-header bg-dark mb-2">
        <div className="d-flex justify-content-between">
          <h3>Orders</h3>
          {ordersUnassigned.length ? (
            <h4>
              Awaiting for: <b className="text-danger">{ordersUnassigned.length} orders</b>
            </h4>
          ) : (
            ''
          )}
        </div>
      </div>
      {orders.length === 0 ? (
        <Emptypage name="Orders" />
      ) : (
        <div className="column">
          <div className="row p-3 d-flex justify-content-between">
            <div className=" d-flex justify-content-center w-25">
              <h4>Sort by:</h4>
            </div>
            <div className="w-75 d-flex align-items-center justify-content-around">
              <div>
                <label>Date</label>
                <select onChange={(e) => setSortDate(e.target.value)}>
                  <option value="all">Default</option>
                  <option value="startDate">Start date</option>
                  <option value="lastStartDate">Last Start Date</option>
                </select>
              </div>
              <div>
                <label>Status</label>
                <select onChange={(e) => setSortStatus(e.target.value)}>
                  <option value="all">-</option>
                  {statusBO && statusBO.map((s) => <option value={s.id}>{s.name}</option>)}
                </select>
              </div>
              <div>
                <label>Priority</label>
                <select onChange={(e) => setSortPriority(e.target.value)}>
                  <option value="all">-</option>
                  <option value="high">High</option>
                  <option value="low">Low</option>
                </select>
              </div>
            </div>
          </div>
          <div className="row p-2 mr-0">
            {ordersFiltered && displayOrders}
            <ReactPaginate
              previousLabel="Previous"
              nextLabel="Next"
              pageCount={pageCount}
              onPageChange={changePage}
              containerClassName="paginationBttns"
              previousLinkClassName="previousBttn"
              nextLinkClassName="nextBttn"
              disabledClassName="paginationDisabled"
              activeClassName="paginationActive"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
