package springboot.restful.util;

public interface ModelMapping<Entity, DTO> {

	Entity dtoToEntity(DTO dto);

	DTO entityToDTO(Entity entity);

}
