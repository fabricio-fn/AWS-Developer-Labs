const express = require("express");
const path = require("path");
const compression = require("compression");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(compression()); // Compressão gzip
app.use(cors()); // CORS habilitado
app.use(express.json()); // Parser JSON
app.use(express.urlencoded({ extended: true })); // Parser URL

// Servir arquivos estáticos da pasta 'public' ou 'build'
app.use(express.static(path.join(__dirname, "public")));

// Headers de segurança básicos
app.use((req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("X-XSS-Protection", "1; mode=block");
  next();
});

// Rota de health check (importante para o Beanstalk)
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// API routes (opcional)
app.get("/api/status", (req, res) => {
  res.json({
    message: "API funcionando!",
    environment: process.env.NODE_ENV || "development",
    version: "1.0.0",
  });
});

// SPA Support - Todas as rotas não-API redirecionam para index.html
app.get("*", (req, res) => {
  // Ignora requests para assets
  if (req.path.includes(".")) {
    return res.status(404).send("Arquivo não encontrado");
  }

  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: "Algo deu errado!",
    message:
      process.env.NODE_ENV === "development"
        ? err.message
        : "Erro interno do servidor",
  });
});

// Graceful shutdown
process.on("SIGINT", () => {
  console.log("Recebido SIGINT, encerrando servidor...");
  process.exit(0);
});

process.on("SIGTERM", () => {
  console.log("Recebido SIGTERM, encerrando servidor...");
  process.exit(0);
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`🌍 Ambiente: ${process.env.NODE_ENV || "development"}`);
  console.log(`📁 Servindo arquivos de: ${path.join(__dirname, "public")}`);
});

module.exports = app;
