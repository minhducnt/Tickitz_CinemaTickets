package springboot.restful.service.implement;


import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import springboot.restful.exception.ResourceNotFoundException;
import springboot.restful.model.entity.Order;
import springboot.restful.model.entity.OrderDetail;
import springboot.restful.model.entity.Ticket;
import springboot.restful.model.payloads.OrderDetailDTO;
import springboot.restful.repository.OrderDetailsRepository;
import springboot.restful.repository.OrderRepository;
import springboot.restful.service.OrderDetailService;
import springboot.restful.service.TicketService;
import springboot.restful.util.ModelMapping;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderDetailServiceImp implements OrderDetailService, ModelMapping<OrderDetail, OrderDetailDTO> {

	@Autowired
	private OrderDetailsRepository orderDetailsRepository;

	@Autowired
	private ModelMapper modelMapper;

	@Autowired
	private TicketService ticketService;

	@Autowired
	private OrderRepository orderRepository;


	@Override
	public OrderDetail dtoToEntity(OrderDetailDTO orderDetailDTO) {
		return modelMapper.map(orderDetailDTO, OrderDetail.class);
	}

	@Override
	public OrderDetailDTO entityToDTO(OrderDetail orderDetail) {
		return modelMapper.map(orderDetail, OrderDetailDTO.class);
	}

	@Override
	public OrderDetailDTO createOrderDetail(OrderDetailDTO orderDetailDTO) {
		OrderDetail orderDetail = dtoToEntity(orderDetailDTO);
		return entityToDTO(orderDetailsRepository.save(orderDetail));
	}

	@Override
	public List<OrderDetailDTO> getOrderDetailsByOrder(int idOrder) {
		Order order = orderRepository.findById(idOrder).orElseThrow(() -> new ResourceNotFoundException("Order", "id", idOrder));
		List<OrderDetail> orderDetails = orderDetailsRepository.findByOrder(order);

		return orderDetails.stream().map(this::entityToDTO).collect(Collectors.toList());
	}


	@Override
	public OrderDetailDTO getOrderDetailById(int idOrderDetail) {
		return entityToDTO(orderDetailsRepository.findById(idOrderDetail).orElseThrow(() -> new ResourceNotFoundException("Order details", "id", idOrderDetail)));
	}

	@Override
	public void deleteById(int id) {
		OrderDetail orderDetail = orderDetailsRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Order detail", "id", id));
		orderDetailsRepository.delete(orderDetail);
	}

	@Override
	public void deleteOrderDetail(OrderDetailDTO orderDetailDTO) {
		orderDetailsRepository.delete(dtoToEntity(orderDetailDTO));
	}

	@Override
	public OrderDetailDTO getOrderDetailsByTicket(int idTicket) {
		Ticket ticket = modelMapper.map(ticketService.getTicketById(idTicket), Ticket.class);
		OrderDetail orderDetail = orderDetailsRepository.findByTicket(ticket).orElseThrow(() -> new ResourceNotFoundException("Order detail", "ticket_id", idTicket));
		return entityToDTO(orderDetail);
	}
}
