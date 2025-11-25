const axios = require('axios');
const prisma = require('../config/prisma');

const fetchUsers = async (req, res) => {
  try {
    const users = [];
    const totalRecords = 1000;
    const recordsPerPage = 20;
    const totalPages = Math.ceil(totalRecords / recordsPerPage);

    for (let page = 1; page <= totalPages; page++) {
      const response = await axios.get(`https://randomuser.me/api/?results=${recordsPerPage}&page=${page}`);
      const results = response.data.results;

      results.forEach(user => {
        users.push({
          uuid: user.login.uuid,
          name: `${user.name.first} ${user.name.last}`,
          email: user.email,
          city: user.location.city
        });
      });
    }

    const created = await prisma.user.createMany({
      data: users,
      skipDuplicates: true
    });

    res.status(200).json({
      success: true,
      message: `Successfully fetched and stored ${created.count} users`,
      count: created.count
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch users',
      error: error.message
    });
  }
};

const getUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 25;
    const search = req.query.search || '';
    
    const skip = (page - 1) * limit;

    const where = search ? {
      OR: [
        { name: { contains: search } },
        { email: { contains: search } },
        { city: { contains: search } }
      ]
    } : {};

    const total = await prisma.user.count({ where });

    const users = await prisma.user.findMany({
      where,
      skip,
      take: limit,
      orderBy: {
        id: 'asc'
      }
    });

    res.status(200).json({
      success: true,
      data: users,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error getting users:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve users',
      error: error.message
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const { uuid } = req.params;
    const { name, email, city } = req.body;

    if (!name || !email || !city) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and city are required'
      });
    }

    const updatedUser = await prisma.user.update({
      where: { uuid },
      data: { name, email, city }
    });

    res.status(200).json({
      success: true,
      message: 'User updated successfully',
      data: updatedUser
    });
  } catch (error) {
    console.error('Error updating user:', error);
    
    if (error.code === 'P2025') {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to update user',
      error: error.message
    });
  }
};

module.exports = {
  fetchUsers,
  getUsers,
  updateUser
};
