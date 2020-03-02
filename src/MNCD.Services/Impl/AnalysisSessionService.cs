using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MNCD.Data;
using MNCD.Domain.Entities;
using MNCD.Domain.Services;

namespace MNCD.Services.Impl
{
    public class AnalysisSessionService : IAnalysisSessionService
    {
        private readonly MNCDContext _ctx;

        public AnalysisSessionService(MNCDContext ctx)
        {
            _ctx = ctx;
        }

        public List<AnalysisSession> GetAnalysisSessions()
        {
            return _ctx.AnalysisSessions.OrderBy(a => a.CreateDate).ToList();
        }

        public AnalysisSession GetAnalysisSession(int id)
        {
            // TODO: switch to async
            var session = _ctx.AnalysisSessions.FirstOrDefault(a => a.Id == id);

            if (session == null)
            {
                // TODO: custom exception
                throw new ApplicationException("Session was not found.");
            }

            return session;
        }

        public async Task<AnalysisSession> GetAnalysisSession(string guid)
        {
            var session = await _ctx.AnalysisSessions
                .Include(a => a.Analyses)
                .ThenInclude(a => a.Request)
                .Include(a => a.Analyses)
                .ThenInclude(a => a.Result)
                .Include(a => a.Analyses)
                .ThenInclude(a => a.MultiLayer)
                .Include(a => a.Analyses)
                .ThenInclude(a => a.MultiLayerCommunities)
                .Include(a => a.Analyses)
                .ThenInclude(a => a.SingleLayer)
                .Include(a => a.Analyses)
                .ThenInclude(a => a.SingleLayerCommunities)
                .Include(a => a.Analyses)
                .ThenInclude(a => a.CommunitiesBarplot)
                .Include(a => a.Analyses)
                .ThenInclude(a => a.CommunitiesTreemap)
                .FirstOrDefaultAsync(a => a.Guid == guid);

            if (session is null)
            {
                // TODO: custom exception
                throw new ApplicationException("Session was not found.");
            }

            return session;
        }

        public void AddAnalysisSession(string name)
        {
            if (string.IsNullOrWhiteSpace(name))
            {
                throw new ArgumentException("Name cannot be empty.");
            }

            var session = new AnalysisSession
            {
                Guid = Guid.NewGuid().ToString(),
                Name = name,
                CreateDate = DateTime.Now
            };

            // TODO: change to async
            _ctx.AnalysisSessions.Add(session);
            _ctx.SaveChanges();
        }

        public void UpdateAnalysisSession(int id, string name)
        {
            if (string.IsNullOrWhiteSpace(name))
            {
                throw new ArgumentException("Name cannot be empty.");
            }

            var session = _ctx.AnalysisSessions.FirstOrDefault(a => a.Id == id);

            if (session == null)
            {
                // TODO: custom exception
                throw new ApplicationException("Analysis session was not found.");
            }

            session.Name = name;

            // TODO: change to async
            _ctx.SaveChanges();
        }

        public void RemoveAnalysisSession(int id)
        {
            var session = _ctx.AnalysisSessions.FirstOrDefault(a => a.Id == id);

            if (session == null)
            {
                // TODO: custom exception
                throw new ApplicationException("Analysis session was not found.");
            }

            // TODO: change to async
            _ctx.AnalysisSessions.Remove(session);
            _ctx.SaveChanges();
        }
    }
}