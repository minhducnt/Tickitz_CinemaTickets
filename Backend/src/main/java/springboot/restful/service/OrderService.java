package springboot.restful.service;

import springboot.restful.model.payloads.OrderDTO;
import springboot.restful.model.payloads.OrderDetailDTO;

import java.util.List;

public interface OrderService {

	//create
	OrderDTO createOrder(List<OrderDetailDTO> orderDetailDTOS);

	//get

	List<OrderDTO> getAllOrders();

	List<OrderDTO> getAllOrdersByUser(int idUser);

	OrderDTO getOrderById(int id);

	OrderDTO payOrder(int id, boolean isPaid);

	//update
	OrderDTO updateOrder(int id, List<OrderDetailDTO> orderDetailDTOS);

	void deleteOrder(int id);


}
