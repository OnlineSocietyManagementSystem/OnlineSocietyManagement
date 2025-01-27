package com.blogs.dao;

import static org.junit.jupiter.api.Assertions.*;

import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.Replace;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import com.blogs.pojos.User;

@DataJpaTest // unit testing of DAO layer , starts DAO layer spring beans + entities
@AutoConfigureTestDatabase(replace = Replace.NONE)
class UserDaoTest {
	@Autowired
	private UserDao userDao;

	@Test
	void testFindByEmailAndPassword() {
		Optional<User> optional = userDao.
findByEmailAndPassword("a2@gmail.com", "1234");
		assertEquals(true,optional.isPresent());
	}

}
