package springboot.restful.service.implement;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.extern.java.Log;
import lombok.extern.log4j.Log4j;
import lombok.extern.slf4j.Slf4j;
import springboot.restful.config.AppConstant;
import springboot.restful.exception.ApiException;
import springboot.restful.exception.ResourceNotFoundException;
import springboot.restful.model.entity.Role;
import springboot.restful.model.entity.User;
import springboot.restful.model.payloads.UserDTO;
import springboot.restful.repository.RoleRepository;
import springboot.restful.repository.UserRepository;
import springboot.restful.service.UserService;
import springboot.restful.util.ModelMapping;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
public class UserServiceImp implements UserService, ModelMapping<User, UserDTO> {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public UserDTO createUser(UserDTO userDTO) {

        if (userDTO.getPhoneNumber().startsWith("+84")) {
            userDTO.setPhoneNumber("0" + userDTO.getPhoneNumber().substring(3));
        }

        Role role = roleRepository.findById(AppConstant.ROLE_USER).get();
        User user = dtoToEntity(userDTO);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.getRoles().add(role);
        User savedUser = this.userRepository.save(user);
        return this.entityToDTO(savedUser);
    }

    @Override
    public UserDTO getUserById(Integer id) {
        User user = userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User", "id", id));
        return entityToDTO(user);
    }

    @Override
    public List<UserDTO> getAllUsers() {
        return userRepository.findAll().stream().map(this::entityToDTO).collect(Collectors.toList());
    }

    @Override
    public UserDTO updateUser(Integer id, UserDTO userDTO) {

        User user = userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User", "id", id));

        user.setFirstName(userDTO.getFirstName());
        user.setLastName(userDTO.getLastName());
        user.setPhoneNumber(userDTO.getPhoneNumber());
        user.setEmail(userDTO.getEmail());
        user.setPassword(passwordEncoder.encode(userDTO.getPassword()));

        User updatedUser = userRepository.save(user);

        return entityToDTO(updatedUser);

    }

    @Override
    public UserDTO changePassword(Integer id, String oldPassword, String newPassword, String confirmPassword) {

        User user = userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User", "id", id));
        log.error(user.toString());
        if (passwordEncoder.matches(oldPassword, user.getPassword())) {

            if (newPassword.equals(confirmPassword))
                user.setPassword(passwordEncoder.encode(newPassword));
            else
                throw new ApiException("New password is not match with confirm password. Please try again!");

        } else
            throw new ApiException("Your password invalid. Please try again!");

        return entityToDTO(userRepository.save(user));
    }

    @Override
    public UserDTO resetPassword(Integer id, String newPassword, String confirmPassword) {

        User user = userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User", "id", id));
        if (newPassword.equals(confirmPassword))
            user.setPassword(passwordEncoder.encode(confirmPassword));
        else
            throw new ApiException("New password is not match with confirm password. Please try again!");

        return entityToDTO(userRepository.save(user));
    }

    @Override
    public User dtoToEntity(UserDTO dto) {
        return this.modelMapper.map(dto, User.class);
    }

    @Override
    public UserDTO entityToDTO(User entity) {
        return this.modelMapper.map(entity, UserDTO.class);
    }

}