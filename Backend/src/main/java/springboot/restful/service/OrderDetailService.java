package springboot.restful.service;

import springboot.restful.model.payloads.OrderDetailDTO;

import java.util.List;

public interface OrderDetailService {

	OrderDetailDTO createOrderDetail(OrderDetailDTO orderDetailDTO);


	List<OrderDetailDTO> getOrderDetailsByOrder(int idOrder);

	OrderDetailDTO getOrderDetailsByTicket(int idTicket);

	OrderDetailDTO getOrderDetailById(int idOrderDetail);

	void deleteById(int id);

	void deleteOrderDetail(OrderDetailDTO orderDetailDTO);

}
