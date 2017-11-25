import React from 'react'
var storage = {
  add: (id, favorited) => localStorage.setItem(id, favorited),
  remove: (id) => localStorage.removeItem(id),
  getShots: (id, favorited) => localStorage.getItem(id)
}

export default storage
