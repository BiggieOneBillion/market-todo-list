const User = require("../models/user.models");

exports.createList = async (req, res) => {
  const { items } = req.body;

  const userId = req.user.id;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.marketLists.push({ items, userId });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: "Error creating market list" });
  }
};

exports.getAllUsersList = async (req, res) => {
  const userId = req.user.id;

  try {
    const marketLists = await User.findById(userId);

    if (!marketLists) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Successfully fetched data",
      data: marketLists.marketLists,
    });
  } catch (error) {

    res.status(500).json({ error: "Error fetching market lists" });
  }
};

exports.getUserMarketList = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  try {
    // Find the user by userId
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find the specific market list by marketListId
    const marketList = user.marketLists.id(id);

    if (!marketList) {
      return res.status(404).json({ message: "Market list not found" });
    }

    // Send the market list as the response
    res.json({ message: "Successfully fetched list", data: marketList });
  } catch (error) {
    res.status(500).json({ error: "Error fetching market list" });
  }
};

exports.addMoreToUserMarketList = async (req, res) => {
  const { id } = req.params; //  marketListId
  const items = req.body;
  const userId = req.user.id;
  try {
    // Find the user by userId
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }


    // Find the specific market list by marketListId
    const marketList = user.marketLists.id(id);

    if (!marketList) {
      return res.status(404).json({ message: "Market list not found" });
    }

    marketList.items.push(items);

    // Save the updated user document with the updated market list
    await user.save();

    // Send the updated market list as the response
    res
      .status(200)
      .json({ message: "Successfully updated list", data: marketList });
  } catch (error) {

    res.status(500).json({ error: "Error updating market list" });
  }
};

// delete a particular market list in the users list
exports.deleteUserMarketList = async (req, res) => {
  const { id } = req.params; // marketlist id
  const userId = req.user.id;
  try {
    const user = await User.findByIdAndUpdate(
      userId,
      {
        $pull: {
          marketLists: {
            _id: id,
          },
        },
      },
      { new: true }
    );
    // if the user doesn't exist
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Send a success response
    res.json({ message: "Market list deleted successfully" });
  } catch (error) {

    res.status(500).json({ error: "Error deleting market list" });
  }
};

// TODO: delete a particular item in a particular list in the user's market list
// exports.deleteParticularItem = async (req, res) => {

// }
exports.deleteParticularItem = async (req, res) => {
  const { id, index } = req.params; //  marketListId

  const userId = req.user.id;
  try {
    // Find the user by userId
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find the specific market list by marketListId
    const marketList = user.marketLists.id(id);

    if (!marketList) {
      return res.status(404).json({ message: "Market list not found" });
    }

    //  using splice to delete the item at the specified index
    marketList.items.splice(index, 1);

    
    // Save the updated user document with the updated market list
    await user.save();

    // Send the updated market list as the response
    res
      .status(200)
      .json({ message: "Successfully deleted item", data: marketList });
  } catch (error) {

    res.status(500).json({ error: "Error updating market list" });
  }
};
