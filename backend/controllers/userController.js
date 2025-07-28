exports.getUserProfile = async (req, res) => {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({
      success: false,
      message: 'User ID is required',
    });
  }

  try {
    const user = await User.findById(userId)
      .select('firstName lastName email district city volunteerHours eventsParticipated')
      .lean();

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    const fullName = `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim();

    return res.status(200).json({
      success: true,
      user: {
        ...user,
        fullName,
      },
    });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch user profile',
      error: error.message,
    });
  }
};


    // Debug log before sending response
    Here’s an alternative, cleaned-up version of your logging and response part with:

* Consistent response structure including a `success` flag
* Using a single `profile` object for clarity
* Adding error logging for better debugging

```js
console.log("Sending user profile:", {
  name: fullName,
  email: user.email,
  district: user.district,
  city: user.city,
  volunteerHours: user.volunteerHours || 0,
  eventsParticipated: user.eventsParticipated || 0,
});

res.status(200).json({
  success: true,
  profile: {
    name: fullName,
    email: user.email,
    district: user.district,
    city: user.city,
    volunteerHours: user.volunteerHours || 0,
    eventsParticipated: user.eventsParticipated || 0,
  },
});
```

And your catch block:

```js
} catch (error) {
  console.error('Error retrieving user profile:', error);
  res.status(500).json({
    success: false,
    message: 'Error retrieving user profile',
    error: error.message,
  });
}
```

---

This version improves response consistency and debugging ease.

Want me to help you combine all this into a full function?
