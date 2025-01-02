import mongoose from 'mongoose'

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/organicaai', {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
    })

    console.log(`MongoDB Connected: ${conn.connection.host}`)

    // Handle connection errors after initial connection
    mongoose.connection.on('error', err => {
      console.error(`MongoDB connection error: ${err}`)
    })

    mongoose.connection.on('disconnected', () => {
      console.warn('MongoDB disconnected. Attempting to reconnect...')
    })

    mongoose.connection.on('reconnected', () => {
      console.log('MongoDB reconnected')
    })

  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`)
    // Exit with failure if this is the initial connection
    process.exit(1)
  }
}

export default connectDB 