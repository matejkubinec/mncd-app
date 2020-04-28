using System;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MNCD.Data;
using MNCD.Domain.Entities;
using MNCD.Domain.Exceptions;
using MNCD.Services.Impl;
using Xunit;

namespace MNCD.Tests.Services
{
    public class AnalysisSessionServiceTests
    {
        [Fact]
        public async Task GetAnalysisSession_InvalidId()
        {
            using (var ctx = InitCtx(nameof(GetAnalysisSession_InvalidId)))
            {
                var service = new AnalysisSessionService(ctx);
                await Assert.ThrowsAsync<ArgumentException>(() => service.GetAnalysisSession(0));
                await Assert.ThrowsAsync<ArgumentException>(() => service.GetAnalysisSession(-1));
            }
        }

        [Fact]
        public async Task GetAnalysisSession_Found()
        {
            using (var ctx = InitCtx(nameof(GetAnalysisSession_Found)))
            {
                var service = new AnalysisSessionService(ctx);
                var session = await service.GetAnalysisSession(1);
                Assert.Equal(1, session.Id);
                Assert.Equal("Session 1", session.Name);
            }
        }

        [Fact]
        public async Task GetAnalysisSession_NotFound()
        {
            using (var ctx = InitCtx(nameof(GetAnalysisSession_NotFound)))
            {
                var service = new AnalysisSessionService(ctx);
                await Assert.ThrowsAsync<AnalysisSessionNotFoundException>(() => service.GetAnalysisSession(404));
            }
        }

        [Fact]
        public async Task AddAnalysisSession_EmptyName()
        {
            using (var ctx = InitCtx(nameof(AddAnalysisSession_EmptyName)))
            {
                var service = new AnalysisSessionService(ctx);
                await Assert.ThrowsAsync<ArgumentException>(() => service.AddAnalysisSession(string.Empty));
            }
        }

        [Fact]
        public async Task AddAnalysisSession_NameNull()
        {
            using (var ctx = InitCtx(nameof(AddAnalysisSession_NameNull)))
            {
                var service = new AnalysisSessionService(ctx);
                await Assert.ThrowsAsync<ArgumentException>(() => service.AddAnalysisSession(null));
            }
        }

        [Fact]
        public async Task AddAnalysisSession_Valid()
        {
            using (var ctx = InitCtx(nameof(AddAnalysisSession_Valid)))
            {
                var service = new AnalysisSessionService(ctx);
                var session = await service.AddAnalysisSession("Session 2");

                Assert.Equal(2, session.Id);
                Assert.Equal("Session 2", session.Name);

                var sessions = await service.GetAnalysisSessions();

                Assert.Collection(sessions,
                    s1 => Assert.Equal("Session 1", s1.Name),
                    s2 => Assert.Equal("Session 2", s2.Name));
            }
        }

        [Fact]
        public async Task UpdateAnalysisSession_InvalidId()
        {
            using (var ctx = InitCtx(nameof(UpdateAnalysisSession_InvalidId)))
            {
                var service = new AnalysisSessionService(ctx);
                await Assert.ThrowsAsync<ArgumentException>(() => service.UpdateAnalysisSession(0, "Session With New Name"));
                await Assert.ThrowsAsync<ArgumentException>(() => service.UpdateAnalysisSession(-1, "Session With New Name"));
            }
        }

        [Fact]
        public async Task UpdateAnalysisSession_NameEmpty()
        {
            using (var ctx = InitCtx(nameof(UpdateAnalysisSession_NameEmpty)))
            {
                var service = new AnalysisSessionService(ctx);
                await Assert.ThrowsAsync<ArgumentException>(() => service.UpdateAnalysisSession(1, string.Empty));
            }
        }

        [Fact]
        public async Task UpdateAnalysisSession_NameNull()
        {
            using (var ctx = InitCtx(nameof(UpdateAnalysisSession_NameNull)))
            {
                var service = new AnalysisSessionService(ctx);
                await Assert.ThrowsAsync<ArgumentException>(() => service.UpdateAnalysisSession(1, null));
            }
        }

        [Fact]
        public async Task UpdateAnalysisSession_NotFound()
        {
            using (var ctx = InitCtx(nameof(UpdateAnalysisSession_NotFound)))
            {
                var service = new AnalysisSessionService(ctx);
                await Assert.ThrowsAsync<AnalysisSessionNotFoundException>(() => service.UpdateAnalysisSession(404, "Session With New Name"));
            }
        }

        [Fact]
        public async Task UpdateAnalysisSession_Valid()
        {
            using (var ctx = InitCtx(nameof(UpdateAnalysisSession_Valid)))
            {
                var service = new AnalysisSessionService(ctx);
                var updated = await service.UpdateAnalysisSession(1, "Session With New Name");
                Assert.Equal(1, updated.Id);
                Assert.Equal("Session With New Name", updated.Name);
            }
        }

        [Fact]
        public async Task RemoveAnalysisSession_InvalidId()
        {
            using (var ctx = InitCtx(nameof(RemoveAnalysisSession_InvalidId)))
            {
                var service = new AnalysisSessionService(ctx);
                await Assert.ThrowsAsync<ArgumentException>(() => service.RemoveAnalysisSession(0));
                await Assert.ThrowsAsync<ArgumentException>(() => service.RemoveAnalysisSession(-1));
            }
        }

        [Fact]
        public async Task RemoveAnalysisSession_NotFound()
        {
            using (var ctx = InitCtx(nameof(RemoveAnalysisSession_NotFound)))
            {
                var service = new AnalysisSessionService(ctx);
                await Assert.ThrowsAsync<AnalysisSessionNotFoundException>(() => service.RemoveAnalysisSession(404));
            }
        }

        [Fact]
        public async Task RemoveAnalysisSession_Valid()
        {
            using (var ctx = InitCtx(nameof(RemoveAnalysisSession_Valid)))
            {
                var service = new AnalysisSessionService(ctx);
                await service.RemoveAnalysisSession(1);
                Assert.Empty(await service.GetAnalysisSessions());
            }
        }

        private MNCDContext InitCtx(string databaseName)
        {
            var options = new DbContextOptionsBuilder<MNCDContext>()
                .UseInMemoryDatabase(databaseName)
                .Options;
            var ctx = new MNCDContext(options);
            ctx.AnalysisSessions.RemoveRange(ctx.AnalysisSessions);
            ctx.SaveChanges();
            ctx.AnalysisSessions.Add(new AnalysisSession
            {
                Name = "Session 1"
            });
            ctx.SaveChanges();
            return new MNCDContext(options);
        }
    }
}