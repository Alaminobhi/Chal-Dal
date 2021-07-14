import React, { useState, useContext } from 'react';
import { Button, Form, FormControl, Modal, Nav, OverlayTrigger, Popover } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import Category from '../Item/Category';
import Drawer from '@material-ui/core/Drawer';
import { useDispatch } from 'react-redux';
import { searchItem } from '../../redux/slices/productSlice';
import { ReactCircleModal } from 'react-circle-modal';
import { useSelector } from 'react-redux';
import Review from './../OrderView/Review';
import { AiOutlineHome, AiOutlineMail, AiFillCaretRight, AiFillUnlock, AiOutlineBars, AiOutlineExport, AiTwotoneShopping, AiOutlineSearch, AiTwotoneFolderOpen, AiOutlineClose } from "react-icons/ai";

const Header = () => {
  const userKey = JSON.parse(localStorage.getItem('userId'));
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const data = JSON.parse(localStorage?.getItem(userKey));
    const shopData = useSelector(state=> state.shop.shop)
    const total = (shopData.length ? shopData : data)?.reduce((total, prd) => total + Number(prd.price) * prd.quantity, 0);
    const dispatch = useDispatch();
      const [state, setState] = useState(false);
      const Close = () => setState(false);
      const Open = () => setState(true);
    const popover = (
      <Popover id="popover-basic">
        <Popover.Title as="h3"><Link className="btn bg-primary" to='/home'>Home</Link></Popover.Title>
        <Popover.Content>
        <Link className="btn" to='/home'><Category/></Link>
        </Popover.Content>
      </Popover>
    );
    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSearch = event => {
    dispatch(searchItem(event.target.value))
    }
    return (
      <div className="fixed-top">
      <Nav className="d-flex justify-content-between bg-light" activeKey="/home">
        <Nav.Item className="ml-2 ml-sm-0">
        <React.Fragment key="left">
           <h3 onClick={Open}><AiOutlineExport /></h3>
           <Drawer anchor="left" open={state} onClose={Open}>
           <div
            role="presentation"
            onClick={Close}
            onKeyDown={Close}
          >
            <div className="primary" onClick={Close}>
              <h1 className="text-right"><AiOutlineClose/></h1>
            </div>
            <Link className="btn" to="/home"><Category/></Link>
          </div>
          </Drawer>
        </React.Fragment>
        </Nav.Item>
        <Nav.Item className="ml-md-auto mr-sm-0 mr-md-5">
        <Form inline>
          <FormControl type="text" placeholder="Search" onBlur={handleSearch} className="mr-sm-2" />
          <Link className="ml-2 ml-sm-0" to="/home"><h3><AiOutlineSearch/></h3></Link>
        </Form>
        </Nav.Item>
        <Nav.Item className="mx-md-5 mx-sm-0">
        <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
        <h3><AiTwotoneFolderOpen/></h3>
       </OverlayTrigger>
        </Nav.Item>
        <Nav.Item>
        <ReactCircleModal
        backgroundColor="#97349a"
        toogleComponent={onClick => (
        <h4 className="mr-md-5 animate__animated animate__bounce" onClick={onClick}>
        <AiTwotoneShopping/>{data?.length}
        </h4>
      )}
      // Optional fields and their default values
      offsetX={0}
      offsetY={0}
      >
      {(onClick) => (
        <div style={{ backgroundColor: '#fff', padding: '1em' }}>
        <div className="border p-2">
        <div onClick={onClick}>
        <div className="row">
        <p className="col">You have reduced delivery charge ৳ {23}</p>
        <h2 className="col-4" onClick={onClick}>
            Close
        </h2>
        </div>
        <h3 className="m-2 text-center">CheckOut List {data?.length} </h3> 
        </div>
        <div className="bg-light border p-2">
            {
             (shopData.length ? shopData : data)?.map(it => <Review
             key={it._id}
             it={it}>
             </Review>)
            }
     
            <hr/>
        <div className="row">
            <p className="col">Total TK</p>
            <p className="col">৳ {total}</p>
        </div>
        </div>  <br/>
        <div className="nav justify-content-end">
        <Link className="btn btn-primary col" to='/orderReview' onClick={onClick} >Order Now</Link>
         </div>
     </div>
        </div>
      )}
    </ReactCircleModal>
        </Nav.Item>
        <Nav.Item className="mr-2 mr-sm-0">
        <h3 variant="primary" onClick={handleShow}>
        <AiOutlineBars/>
        </h3>
          <Modal show={show} onHide={handleClose} animation={false}>
            <Modal.Header closeButton>
              <Modal.Title><Link className="" to='/home'><AiOutlineHome/> Home</Link> <img className="mr-auto" style={{height: 80, width: 80, borderRadius: 50}} src={loggedInUser?.photo} alt="" /> {loggedInUser?.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <h5 className="ml-5" onClick={handleClose}>
            <Link className="btn hov" to="/login"><AiFillUnlock/> Login / Signup</Link><br/>
            <Link className="btn hov" to='/orderReview'><AiOutlineMail/> Order Now</Link> <br/>
            <Link className="btn hov" to="/orderList"><AiFillCaretRight/> Order List</Link>
            </h5>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </Nav.Item>
      </Nav>
      </div>
    );
};

export default Header;